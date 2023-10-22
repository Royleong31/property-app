<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import SearchResult from '../../components/pages/SearchResult.svelte';

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

<div class="header">
  <div class="headerContainer">
    <h2>My Activities</h2>
    <p>Manage liked properties and more</p>
  </div>
</div>

<div class="container">
  <div class="searchResultsContainer">
    {#each listingsArr as listing}
      <SearchResult {...listing} />{/each}
  </div>
</div>

<style lang="scss">
  .header {
    background: #fefae0;
    padding: 2rem 0;
    margin-bottom: 32px;
  }

  .headerContainer {
    max-width: 1200px;
    margin: auto;

    & > p {
      font-size: 12px;
    }
  }

  .container {
    max-width: 1200px;
    margin: auto;

    .searchResultsContainer {
      margin: 32px 0;
      display: flex;
      flex-direction: column;
      row-gap: 24px;
    }
  }
</style>
