<script lang="ts">
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  let searchInput = '';
  import authStore from '$lib/store/auth';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  interface ChatMessage {
    id: string;
    propertyId: string;
    buyerId: string;
    sellerId: string;
    streetName: string;
    sellerName: string;
    buyerName: string;
    isBuyer: boolean;
    latestMessage: string;
    bedroomCount: number;
    bathroomCount: number;
    area: number;
    price: number;
    avatarImg: string;
    propertyImg: string;
    otherPersonName: string;
    messages: {
      message: string;
      created_at: string;
      sender_id: string;
    }[];
  }

  let chatId = '';
  let textMessage = '';
  $: chatId = $page.url.searchParams.get('chatId') ?? '';

  export let data;
  export let openLoginHandler: () => void;
  const supabase = data.supabase;

  let chats: ChatMessage[] = [];

  authStore.subscribe(async val => {
    if (val?.id) {
      chats = await getChats(val.id);
    }
  });

  onMount(() => {
    supabase
      .channel('*')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_message' },
        async payload => {
          if (!$authStore?.id) return;
          chats = await getChats($authStore.id);
        },
      )
      .subscribe();
  });

  $: filteredChats = chats.filter(chat => {
    const otherPersonName = !chat.isBuyer ? chat.buyerName : chat.sellerName;

    return (
      searchInput.length === 0 ||
      chat.streetName.toLowerCase().includes(searchInput.toLowerCase()) ||
      otherPersonName.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  $: currentChat = chats.find(chat => chat.id === chatId);

  const sendMessageHandler = async () => {
    if (!$authStore?.id || textMessage.length === 0) return;

    const { error } = await supabase.from('chat_message').insert({
      chat_id: chatId,
      message: textMessage,
      sender_id: $authStore.id,
    });

    if (error) {
      alert(error.message);
    } else {
      textMessage = '';
    }
  };

  async function getChats(userId: string) {
    const { data, error } = await supabase
      .from('chat')
      .select(
        'id, property_for_sale(street_name, user(full_name, id), no_of_bedrooms, no_of_bathrooms, floor_area, price, property_images(image_url)), buyer_id, user(full_name, id), chat_message(id, message, created_at, sender_id), property_id',
      )
      .order('created_at', { ascending: false });

    if (error) {
      // alert(error.message);
      return [];
    }

    const chats = data
      .map((chat, index) => {
        let latestMessage = chat.chat_message[0];
        for (const message of chat.chat_message) {
          if (message.created_at > latestMessage.created_at) {
            latestMessage = message;
          }
        }

        return {
          id: chat.id,
          propertyId: chat.property_id,
          buyerId: chat.buyer_id,
          sellerId: (chat.property_for_sale as any).user.id,
          streetName: chat.property_for_sale.street_name,
          sellerName: chat.property_for_sale.user.full_name,
          buyerName: chat.user.full_name,
          propertyImg: chat.property_for_sale.property_images[0].image_url,
          bedroomCount: chat.property_for_sale.no_of_bedrooms,
          bathroomCount: chat.property_for_sale.no_of_bathrooms,
          area: chat.property_for_sale.floor_area,
          price: chat.property_for_sale.price,
          latestMessage: latestMessage?.message ?? '...',
          messages: chat.chat_message,
          isBuyer: chat.buyer_id === userId,
          otherPersonName:
            chat.buyer_id === userId ? chat.property_for_sale.user.full_name : chat.user.full_name,
          avatarImg: `https://source.unsplash.com/random/?person&${index}`,
        } as ChatMessage;
      })
      // unfortunately, supabase doesn't support filtering on multiple tables, so we have to do this manually or use a more complicated query
      .filter(chat => chat.buyerId === userId || chat.sellerId === userId);

    return chats;
  }
</script>

<div class="container">
  <div class="left">
    <div class="inputContainer">
      <img class="searchImg" src="{base}/search.svg" alt="" />
      <input placeholder="Search Chats" type="text" bind:value={searchInput} />
    </div>

    <div class="contactsContainer">
      {#each filteredChats as chat, index}
        <button class="contact" type="button" on:click={() => goto(`/chat?chatId=${chat.id}`)}>
          <img src={chat.avatarImg} alt="" />
          <p class="name">{chat.otherPersonName}</p>
          <p class="address">{chat.streetName}</p>
          <p class="text">{chat.latestMessage}</p>
        </button>
      {/each}
    </div>
  </div>

  <div class="right">
    {#if currentChat}
      <div class="nameContainer">
        <img src={currentChat?.avatarImg} alt="" class="profilePic" />
        <p class="name">{currentChat?.otherPersonName}</p>
      </div>

      <div class="scrollContainer">
        <div class="houseDetails">
          <img src={currentChat?.propertyImg} alt="" class="photo" />

          <div class="details">
            <h3 class="name">{currentChat?.streetName}</h3>
            <p class="price">
              S{new Intl.NumberFormat('en-SG', {
                style: 'currency',
                currency: 'SGD',
                maximumFractionDigits: 0,
              }).format(currentChat?.price ?? 0)}
            </p>

            <div class="detailContainer">
              <div class="detail">
                <p class="detailText">{currentChat?.bedroomCount} bed</p>
              </div>
              <div class="detail">
                <p class="detailText">{currentChat?.area} sqm</p>
              </div>
              <div class="detail">
                <p class="detailText">
                  S{new Intl.NumberFormat('en-SG', {
                    style: 'currency',
                    currency: 'SGD',
                    minimumFractionDigits: 2,
                  }).format((currentChat?.price ?? 0) / (currentChat?.area ?? 1))} psm
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="chat">
          {#each currentChat?.messages ?? [] as message}
            <div
              class="message {message.sender_id === $authStore?.id
                ? 'messageRight'
                : 'messageLeft'}"
            >
              <p class="text">{message.message}</p>
              <p class="time">{message.created_at}</p>
            </div>
          {/each}
        </div>
      </div>

      <form class="textInput" on:submit|preventDefault={sendMessageHandler}>
        <img src="{base}/icons/file.svg" alt="" class="icon" />
        <input placeholder="Write your message" bind:value={textMessage} rows={1} />
        <img src="{base}/icons/camera.svg" alt="" class="icon" />
        <img src="{base}/icons/microphone.svg" alt="" class="icon" />
      </form>
    {/if}
  </div>
</div>

<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: 400px 1fr;
    column-gap: 1.5rem;
    max-width: 1200px;
    margin: auto;
  }

  .inputContainer {
    position: relative;
    margin: auto;
    flex: 1;
    background: #d9d9d9;
    border-radius: 12px;
    height: 40px;

    input {
      height: 100%;
      padding: 5px 10px;
    }

    .searchImg {
      height: 20px;
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .contactsContainer {
    margin-top: 1rem;
    display: flex;
    row-gap: 1rem;
    flex-direction: column;

    .contact {
      text-align: left;
      cursor: pointer;
      background: #d9d9d9;
      border-radius: 12px;
      padding: 10px;
      row-gap: 8px;
      column-gap: 12px;
      display: grid;
      grid-template-columns: 64px 1fr;
      grid-template-rows: repeat(3, min-content);

      & > p {
        grid-column: 2 / span 1;
      }

      .name,
      .text {
        font-size: 14px;
        color: #505050;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .address {
        font-size: 16px;
        font-weight: bold;
      }

      img {
        width: 64px;
        height: 64px;
        object-fit: cover;
        border-radius: 50%;
        grid-row: 1 / -1;
      }
    }
  }

  .right {
    background: #eeefde;
    border-radius: 6px;
    height: 700px;
    display: flex;
    flex-direction: column;

    .nameContainer {
      padding: 16px;
      display: flex;
      align-items: center;
      font-size: 24px;
      column-gap: 1rem;

      & > img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }
    }

    .houseDetails {
      padding: 16px;
      width: 100%;
      display: flex;
      margin: 1rem 0;
      height: 100px;
      column-gap: 1rem;

      & > .photo {
        width: 100px;
        object-fit: cover;
        border-radius: 12px;
      }

      & > .details {
        background: #fefae0;
        padding: 4px 8px;
        width: 100%;
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        row-gap: 6px;
      }

      .detailContainer {
        display: flex;
        column-gap: 1rem;

        & > .detail {
          border: 1px solid black;
          padding: 5px 10px;
          border-radius: 12px;
          background: #eeefde;
        }
      }
    }

    .chat {
      height: min(500px, 100vh - 250px);
      padding: 16px;

      display: flex;
      flex-direction: column;

      & .time {
        margin-top: 4px;
        color: #aaa;
        font-weight: 300;
      }

      .message {
        max-width: 200px;

        & > .text {
          padding: 8px 16px;
        }

        &.messageLeft {
          & > .text {
            border-radius: 0 16px 16px 16px;
            background: white;
          }
        }

        &.messageRight {
          color: white;
          margin-left: auto;
          & > .text {
            border-radius: 16px 0 16px 16px;
            background: #20a090;
          }
        }
      }
    }

    .scrollContainer {
      height: 100%;
      overflow-y: scroll;
    }

    & > .textInput {
      justify-self: end;
      width: 100%;
      display: flex;
      justify-content: center;
      column-gap: 10px;
      align-items: center;
      background: white;
      padding: 10px;

      img {
        width: 32px;
        height: 32px;
      }

      & > input {
        flex: 1;
        font-size: 20px;
        border-radius: 12px;
        padding: 5px 10px;
      }
    }
  }
</style>
