<script lang="ts">
  import { base } from '$app/paths';

  export let price: number;
  export let name: string;
  export let address: string;
  export let bedroomCount: number;
  export let area: number;
  export let imgSrc: string;
</script>

<div class="card">
  <div class="left">
    <img src="{base}/houses/{imgSrc}" alt={address} />
  </div>
  <div class="right">
    <div class="nameContainer">
      <h3 class="name">{name}</h3>
      <button class="like">LIKE</button>
    </div>
    <p class="address">{address}</p>
    <p class="price">
      S{new Intl.NumberFormat('en-SG', {
        style: 'currency',
        currency: 'SGD',
        minimumFractionDigits: 0
      }).format(price / area)}
    </p>

    <div class="infoContainer">
      <div class="info">{bedroomCount} bedroom</div>
      <div class="info">{area} sqm</div>
      <div class="info">
        S{new Intl.NumberFormat('en-SG', {
          style: 'currency',
          currency: 'SGD',
          minimumFractionDigits: 2
        }).format(price / area)}
      </div>
    </div>
    <button class="moreInfo">More Information</button>
    <button class="contactSeller">Contact Seller</button>
  </div>
</div>

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
    }

    .price {
      font-size: 24px;
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
