<script lang="ts">
  import { base } from '$app/paths';
  interface Listing {
    price: number;
    name: string;
    address: string;
    bedroomCount: number;
    bathroomCount: number;
    imgSrc: string;
  }

  export let listingsArr: Array<Listing>;
</script>

<div class="container">
  <p class="heading">New Listing</p>

  <div class="listingsContainer">
    {#each listingsArr as listing}
      <div class="card">
        <img class="cardImg" src="{base}/houses/{listing.imgSrc}" alt="House" />
        <div class="content">
          <h3 class="h3">
            S{new Intl.NumberFormat('en-SG', {
              style: 'currency',
              currency: 'SGD',
              minimumFractionDigits: 0
            }).format(listing.price)}
          </h3>

          <div>
            <h4 class="name">{listing.name}</h4>
            <p class="address">{listing.address}</p>
          </div>

          <div class="logos">
            <div class="logo">
              <p>{listing.bedroomCount}</p>
              <img src="{base}/icons/bed.svg" alt="Bed" />
            </div>
            <div class="logo">
              <p>{listing.bathroomCount}</p>
              <img src="{base}/icons/bathroom.svg" alt="Bath" />
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .container {
    width: 100%;
    max-width: 1400px;
    margin: auto;
  }

  .heading {
    color: #bc6c25;
    font-family: Inter;
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    margin-bottom: 1rem;
  }

  .listingsContainer {
    display: flex;
    column-gap: 1rem;
  }

  .card {
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .content {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
      background: #fefae0;
    }

    .address {
      font-weight: 300;
    }

    .cardImg {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .logos {
      display: flex;
      column-gap: 2rem;
    }

    .logo {
      display: flex;
      column-gap: 0.5rem;
      align-items: center;
    }
  }
</style>
