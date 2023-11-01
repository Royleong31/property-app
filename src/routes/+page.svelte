<script lang="ts">
  import { base } from '$app/paths';
  import type { HomePageProps } from '$lib/types/routes/root';
  import type { ComponentProps } from 'svelte';
  import ListingsContainer from '../components/pages/ListingsContainer.svelte';
  import { goto } from '$app/navigation';

  const priceSelectOptions = [
    '$0 - $200,000',
    '$200,001 - $400,000',
    '$400,001 - $700, 000',
    '$700,001 - $1,000,000',
    '$1,000,001 - $2,000,000',
    '$2,000,001 - $5,000,000',
    '$5,000,001 - $10,000,000',
    '$10,000,001+',
  ];
  const bedroomSelectOptions = ['1', '2', '3', '4', '5', '6+'];

  let searchInput = '';
  let selectedPrice = '';
  let selectedBedroom = '';

  export let data;

  const listingsArr: ComponentProps<ListingsContainer>['listingsArr'] = data.propertyData.map(
    val => {
      return {
        id: val.id,
        price: val.price,
        name: val.street_name,
        address: val.unit_number,
        bedroomCount: val.no_of_bedrooms,
        bathroomCount: val.no_of_bathrooms,
        area: val.floor_area,
        imgSrc: val.property_images[0]?.image_url ?? '',
      };
    },
  );

  const submitHandler = () => {
    let priceFrom: null | number = null;
    let priceTo: null | number = null;
    let bedroomCount: null | number = null;

    const priceArr = selectedPrice.split('-');
    priceFrom = priceArr[0] ? parseInt(priceArr[0]) : null;
    priceTo = priceArr[1] ? parseInt(priceArr[1]) : null;
    bedroomCount =
      selectedBedroom === '6+' ? 6 : selectedBedroom ? parseInt(selectedBedroom) : null;
    console.log(priceFrom, priceTo, bedroomCount);

    let newUrl = '/properties';
    if (!!bedroomCount || !!priceFrom || !!priceTo || !!searchInput) newUrl += '?';
    if (bedroomCount) newUrl += `bedrooms=${bedroomCount}`;
    if (priceFrom) newUrl += `&priceFrom=${priceFrom}`;
    if (priceTo) newUrl += `&priceTo=${priceTo}`;
    if (searchInput) newUrl += `location=${searchInput}`;

    goto(newUrl, { invalidateAll: true, replaceState: true });
  };
</script>

<section class="landing">
  <div class="left">
    <h1>
      Find and explore your dream property at <span class="highlight">affordable</span> prices
    </h1>
    <p>
      Find your dream home with the most comprehensive resale property database, discover high-rise
      properties such as HDB, condo and apartment or landed property for sale in Singapore.
    </p>
  </div>

  <div class="right">
    <img src="{base}/landing.jpeg" alt="Landing page" />
  </div>

  <div class="buy">
    <p>Buy</p>
    <form on:submit|preventDefault={submitHandler}>
      <div class="inputContainer">
        <img class="searchImg" src="{base}/search.svg" alt="" />
        <input placeholder="Search by your location" type="text" bind:value={searchInput} />
      </div>

      <div class="options">
        <label for="price">Price Range: </label>
        <select name="price" bind:value={selectedPrice}>
          {#each priceSelectOptions as option}
            <option value={option}>
              {option}
            </option>
          {/each}
        </select>

        <label for="bedrooms">Bedrooms: </label>
        <select name="bedrooms" bind:value={selectedBedroom}>
          {#each bedroomSelectOptions as option}
            <option value={option}>
              {option}
            </option>
          {/each}
        </select>
      </div>
    </form>
  </div>
</section>

<div style="height: 200px;" />

<section class="listings">
  <ListingsContainer {listingsArr} />
</section>

<style lang="scss">
  .landing {
    display: grid;
    grid-template-columns: 4fr 3fr;
    position: relative;
  }

  .left {
    background: #fefae0;
    padding: 2rem;
    padding-left: 10rem;

    h1 {
      font-family: Inter;
      font-size: 75px;
      font-style: normal;
      font-weight: 800;
      letter-spacing: 1.875px;

      span {
        color: #606c38;
      }
    }

    p {
      margin-top: 5rem;
      font-family: Inter;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      letter-spacing: 0.5px;
    }
  }

  .right {
    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  .buy {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    background: #283618bd;
    text-align: center;
    width: 900px;
    padding: 1rem 8rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    .inputContainer {
      position: relative;
      margin: auto;

      .searchImg {
        height: 20px;
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    p {
      color: #fefae0;
      font-family: Inter;
      font-size: 40px;
      font-style: normal;
      font-weight: 800;
      line-height: normal;
      letter-spacing: 1px;
    }

    input {
      background: #d9d9d9;
      border-radius: 30px;
      width: 100%;
      height: 32px;
      padding: 1rem;
    }

    .options {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      width: min-content;
      margin-left: auto;
      column-gap: 1rem;

      label {
        width: max-content;
        color: white;
      }

      select {
        border-radius: 4px;
        padding: 0.2rem 0.5rem;
        background: #ccc;
        color: black;

        &::-ms-expand {
          display: block;
        }
      }
    }
  }

  .listings {
    background: #f1f1f1;
    border-top: 1px solid black;
    padding: 2rem 0;
  }
</style>
