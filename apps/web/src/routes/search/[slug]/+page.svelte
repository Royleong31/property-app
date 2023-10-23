<script lang="ts">
  import type { PropertySearchProps } from '$lib/types/routes/propertySearch';
  import SearchResult from '../../../components/pages/SearchResult.svelte';
  let searchInput = '';
  import { base } from '$app/paths';
  import type { ComponentProps } from 'svelte';

  export let data: PropertySearchProps;
  console.log(data);

  const listingsArr: Array<ComponentProps<SearchResult>> = [
    {
      price: 1420123,
      name: 'Nanyang Heights',
      address: '123 Nanyang View, Singapore',
      bedroomCount: 4,
      area: 123,
      imgSrc: `nanyangHouse.png`
    },
    {
      price: 8000135,
      name: 'SUTD Apartments',
      address: '123 Nanyang View, Singapore',
      bedroomCount: 4,
      area: 123,
      imgSrc: `sutdHouse.png`
    },
    {
      price: 139404,
      name: 'Nanyang Heights',
      address: '123 Nanyang View, Singapore',
      bedroomCount: 4,
      area: 123,
      imgSrc: 'unionHouse.png'
    },
    {
      price: 1038953,
      name: 'NUS View',
      address: '123 Nanyang View, Singapore',
      bedroomCount: 4,
      area: 123,
      imgSrc: `nusHouse.png`
    }
  ];
</script>

<div class="container">
  <div class="controls">
    <div class="inputContainer">
      <img class="searchImg" src="{base}/search.svg" alt="" />
      <input placeholder="Search by your location" type="text" bind:value={searchInput} />
    </div>

    <select name="price" id="price">
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
    <select name="bedroom" id="bedroom">
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
