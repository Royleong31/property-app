<script lang="ts">
  import { base } from '$app/paths';
  let searchInput: string;
</script>

<div class="container">
  <div class="left">
    <div class="inputContainer">
      <img class="searchImg" src="{base}/search.svg" alt="" />
      <input placeholder="Search Chats" type="text" bind:value={searchInput} />
    </div>

    <div class="contactsContainer">
      <div class="contact">
        <img
          src="https://images.unsplash.com/photo-1557296387-5358ad7997bb?auto=format&fit=crop&q=80&w=1657&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <p class="name">Susan8</p>
        <p class="address">183A Fengshan Greenville</p>
        <p class="text">Sure I am happy to know that you</p>
      </div>

      <div class="contact">
        <img
          src="https://plus.unsplash.com/premium_photo-1664453547090-0e8a92a6ed4c?auto=format&fit=crop&q=80&w=1886&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <p class="name">Susan8</p>
        <p class="address">183A Fengshan Greenville</p>
        <p class="text">Sure I am happy to know that you</p>
      </div>

      <div class="contact">
        <img
          src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?auto=format&fit=crop&q=80&w=1666&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <p class="name">Susan8</p>
        <p class="address">183A Fengshan Greenville</p>
        <p class="text">Sure I am happy to know that you</p>
      </div>

      <div class="contact">
        <img
          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1661&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <p class="name">Susan8</p>
        <p class="address">183A Fengshan Greenville</p>
        <p class="text">Sure I am happy to know that fsad dfsa sdfa sdf fdsadsf afsdayou</p>
      </div>
    </div>
  </div>

  <div class="right">
    <div class="nameContainer">
      <img
        src="https://images.unsplash.com/photo-1557296387-5358ad7997bb?auto=format&fit=crop&q=80&w=1657&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        class="profilePic"
      />
      <p class="name">Timothy</p>
    </div>

    <div class="houseDetails">
      <img
        src="https://plus.unsplash.com/premium_photo-1661962841993-99a07c27c9f4?auto=format&fit=crop&q=80&w=1631&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        class="photo"
      />

      <div class="details">
        <h3 class="name">134 Fengshan Greenville</h3>
        <p class="price">S$423,000</p>

        <div class="detailContainer">
          <div class="detail">
            <p class="detailText">3 bed</p>
          </div>
          <div class="detail">
            <p class="detailText">1001 sqm</p>
          </div>
          <div class="detail">
            <p class="detailText">S$432.33 psm</p>
          </div>
        </div>
      </div>
    </div>

    <div class="chat">
      <div class="message messageLeft">
        <p class="text">Hi, I am interested in your property.</p>
        <p class="time">12:30pm</p>
      </div>

      <div class="message messageRight">
        <p class="text">Hi, I am interested in your property.</p>
        <p class="time">12:30pm</p>
      </div>
    </div>

    <div class="textInput">
      <img src="{base}/icons/file.svg" alt="" class="icon" />
      <textarea placeholder="Write your message" rows={1} />
      <img src="{base}/icons/camera.svg" alt="" class="icon" />
      <img src="{base}/icons/microphone.svg" alt="" class="icon" />
    </div>
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

    & > .nameContainer {
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

    & > .houseDetails {
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

    & > .chat {
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

    & > .textInput {
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

      & > textarea {
        flex: 1;
        font-size: 20px;
        border-radius: 12px;
        padding: 5px 10px;
      }
    }
  }
</style>
