<script lang="ts">
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import type { SupabaseClient } from '@supabase/supabase-js';

  export let price: number;
  export let name: string;
  export let address: string;
  export let bedroomCount: number;
  export let area: number;
  export let imgSrc: string;
  export let id: string;
  export let supabase: SupabaseClient;
  import authStore from '$lib/store/auth';
  import { onMount } from 'svelte';

  let isLiked = false;

  const checkIsPropertyLiked = async (userId: string) => {
    const result = await supabase
      .from('likes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .eq('property_id', id);

    return (result?.data?.length ?? 0) > 0;
  };

  authStore.subscribe(async val => {
    if (val?.id) {
      isLiked = await checkIsPropertyLiked(val.id);
    }
  });

  const likeHandler = async () => {
    if (!$authStore?.id) {
      alert('you are not logged in');
      return;
    }

    // Optimistic updating
    if (isLiked) {
      const result = await supabase.from('likes').delete().eq('property_id', id);
      if (!result.error) {
        console.log('unlike success');
        isLiked = false;
      }
    } else {
      const result = await supabase
        .from('likes')
        .insert([{ property_id: id, user_id: $authStore.id }]);
      if (!result.error) {
        console.log('like success');
        isLiked = true;
      }
    }

    isLiked = await checkIsPropertyLiked($authStore.id);
  };

  const goToChatHandler = async () => {
    console.log('inside chat handler');
    if (!$authStore?.id) {
      alert('you are not logged in');
      // TODO: Open login modal
      return;
    }
    // TODO: Don't allow user to chat with themselves
    const existingRecord = await supabase
      .from('chat')
      .select('id')
      .eq('property_id', id)
      .eq('buyer_id', $authStore.id);
    console.log(existingRecord);

    let chatId = '';

    if (existingRecord.data && (existingRecord.data?.length ?? 0) > 0) {
      chatId = existingRecord.data[0].id;
    } else {
      const result = await supabase
        .from('chat')
        .upsert({
          property_id: id,
          buyer_id: $authStore.id,
        })
        .select('*');

      if (result.error) alert(result.error.message);
      else {
        chatId = result.data[0].id;
      }
    }

    goto(`/chat?chatId=${chatId}`);
  };
</script>

<a href="/property/{id}">
  <div class="card">
    <div class="left">
      <img src={imgSrc} alt={address} />
    </div>
    <div class="right">
      <div class="nameContainer">
        <h3 class="name">{name}</h3>
        <button
          class="like"
          on:click|preventDefault={e => {
            e.preventDefault();
            likeHandler();
          }}><img src="{base}/icons/like-{isLiked ? '' : 'un'}filled.svg" alt="" /></button
        >
      </div>
      <p class="address">{address}</p>
      <p class="price">
        S{new Intl.NumberFormat('en-SG', {
          style: 'currency',
          currency: 'SGD',
          minimumFractionDigits: 0,
        }).format(price / area)}
      </p>

      <div class="infoContainer">
        <div class="info">{bedroomCount} bedroom</div>
        <div class="info">{area} sqm</div>
        <div class="info">
          S{new Intl.NumberFormat('en-SG', {
            style: 'currency',
            currency: 'SGD',
            minimumFractionDigits: 2,
          }).format(price / area)}
        </div>
      </div>
      <button class="moreInfo">More Information</button>
      <button
        class="contactSeller"
        on:click={e => {
          e.preventDefault();
          goToChatHandler();
        }}>Contact Seller</button
      >
    </div>
  </div>
</a>

<style lang="scss">
  .card {
    display: grid;
    grid-template-columns: 3fr 2fr;
    border: 1px solid black;
    border-radius: 12px;
    overflow: hidden;
    max-height: 280px;
    cursor: pointer;
  }

  .left {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .right {
    padding: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    .nameContainer {
      display: flex;
      justify-content: space-between;

      .name {
        font-size: 24px;
      }

      .like {
      }
    }

    .address {
      font-size: 16px;
      color: #444;
    }

    .price {
      font-size: 18px;
    }

    .infoContainer {
      display: flex;
      justify-content: space-between;
      margin: 0 20px;

      .info {
        border: 1px solid black;
        padding: 5px;
        border-radius: 6px;
        background: #d9d9d9;
      }
    }

    .moreInfo,
    .contactSeller {
      width: calc(100% - 40px);
      border-radius: 6px;
      background: #d9d9d9;
      padding: 10px;
      margin: 0 auto;
    }

    .moreInfo {
      color: #bc6c25;
    }

    .contactSeller {
      color: #0c6a27;
    }
  }
</style>
