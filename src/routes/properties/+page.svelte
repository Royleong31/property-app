<script lang="ts">
  import type { PropertySearchProps } from '$lib/types/routes/propertySearch';
  import SearchResult from '../../components/pages/SearchResult.svelte';
  let searchInput = '';
  import { base } from '$app/paths';
  import type { ComponentProps } from 'svelte';
  import { queryParam } from 'sveltekit-search-params';
  import { goto } from '$app/navigation';

  export let data;
  let price: string = '';
  let bedroom: string = '';
  let listingsArr: Array<ComponentProps<SearchResult>> = [];
  $: {
    listingsArr = data.propertyData.map(val => ({
      id: val.id,
      price: val.price,
      name: val.street_name,
      address: val.unit_number,
      bedroomCount: val.no_of_bedrooms,
      area: val.floor_area,
      imgSrc: val.property_images[0]?.image_url ?? '',
      supabase: data.supabase,
    }));
  }
  const submitHandler = () => {
    let priceFrom: null | number = null;
    let priceTo: null | number = null;
    let bedroomCount: null | number = null;

    const priceArr = price.split('-');
    priceFrom = priceArr[0] ? parseInt(priceArr[0]) : null;
    priceTo = priceArr[1] ? parseInt(priceArr[1]) : null;
    bedroomCount = bedroom === '6+' ? 6 : bedroom ? parseInt(bedroom) : null;
    console.log(priceFrom, priceTo, bedroomCount);

    let newUrl = '/properties';
    if (!!bedroomCount || !!priceFrom || !!priceTo || !!searchInput) newUrl += '?';
    if (bedroomCount) newUrl += `bedrooms=${bedroomCount}`;
    if (priceFrom) newUrl += `&priceFrom=${priceFrom}`;
    if (priceTo) newUrl += `&priceTo=${priceTo}`;
    if (searchInput) newUrl += `location=${searchInput}`;
    if (newUrl !== window.location.href) {
      goto(newUrl, { invalidateAll: true, replaceState: true });
    }
  };
</script>

<div class="container">
  <div class="controls">
    <form class="inputContainer" on:submit|preventDefault={submitHandler}>
      <img class="searchImg" src="{base}/search.svg" alt="" />
      <input placeholder="Search by your location" type="text" bind:value={searchInput} />
    </form>

    <select name="price" id="price" bind:value={price} on:change={submitHandler}>
      <option value="" disabled selected hidden>Price</option>
      <option value="0-200000">0 - 200,000</option>
      <option value="200001-400000">200,001 - 400,000</option>
      <option value="400001-700000">400,001 - 700,000</option>
      <option value="700001-1000000">700,001 - 1,000,000</option>
      <option value="1000001-2000000">1,000,001 - 2,000,000</option>
      <option value="2000001-5000000">2,000,001 - 5,000,000</option>
      <option value="5000001-10000000">5,000,001 - 10,000,000</option>
      <option value="10000001+">10,000,001+</option>
    </select>
    <select name="bedroom" id="bedroom" bind:value={bedroom} on:change={submitHandler}>
      <option value="" disabled selected hidden>Bedroom</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6+">6+</option>
    </select>
  </div>

  <div class="searchResultsContainer">
    {#each listingsArr as listing}
      <SearchResult {...listing} />{/each}
  </div>
</div>

<style lang="scss">
  .container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1000px;
    margin: auto;
    flex-direction: column;
  }

  .controls {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 36px;

    .inputContainer {
      position: relative;
      margin: auto;
      flex: 1;
      background: #d9d9d9;
      border-radius: 12px;
      height: 100%;

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

    select {
      height: 100%;
      border: 1px solid black;
      min-width: 100px;
      margin-left: 25px;
      padding: 5px 10px;
      border-radius: 6px;
      background: #d9d9d9;
    }
  }

  .searchResultsContainer {
    margin: 32px 0;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
  }
</style>
