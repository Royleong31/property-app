<script lang="ts">
  import type { PropertySearchProps } from '$lib/types/routes/propertySearch';
  import SearchResult from '../../components/pages/SearchResult.svelte';
  let searchInput = '';
  import { base } from '$app/paths';
  import type { ComponentProps } from 'svelte';
  import { queryParam } from 'sveltekit-search-params';
  import { goto } from '$app/navigation';
  import authStore from '$lib/store/auth';

  export let data;
  let price: string = '';
  let bedroom: string = '';
  let listingsArr: Array<ComponentProps<SearchResult>> = [];

  const getLikedListings = async (userId: string): Promise<Array<ComponentProps<SearchResult>>> => {
    const result = await data.supabase
      .from('likes')
      .select(
        'id, user_id, property_for_sale(id, property_images (image_url), price, no_of_bedrooms, no_of_bathrooms, floor_area, street_name, unit_number)',
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    return (
      result.data?.map(val => ({
        id: val.property_for_sale.id,
        price: val.property_for_sale.price,
        name: val.property_for_sale.street_name,
        address: val.property_for_sale.unit_number,
        bedroomCount: val.property_for_sale.no_of_bedrooms,
        area: val.property_for_sale.floor_area,
        imgSrc: val.property_for_sale.property_images[0]?.image_url ?? '',
        supabase: data.supabase,
      })) ?? []
    );
  };

  authStore.subscribe(async val => {
    if (val?.id) {
      listingsArr = await getLikedListings(val.id);
      console.log(listingsArr);
    }
  });
</script>

<div class="container">
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
