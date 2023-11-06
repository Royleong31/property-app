<script lang="ts">
  import type { SupabaseClient } from '@supabase/supabase-js';
  import BoostModal from '../modals/BoostModal.svelte';
  import { goto } from '$app/navigation';

  export let supabase: SupabaseClient;
  export let propertyId: string;
  export let userId: string;

  let amtInput = '';
  let showBoostModal = false;

  const openBoostModal = () => {
    showBoostModal = true;
    console.log('opening modal');
  };

  const boostHandler = async (amount: number) => {
    try {
      const result = await supabase
        .from('boosts')
        .insert({ booster_id: userId, property_id: propertyId, amount });
      console.log(result);
      const result1 = await supabase
        .from('property_for_sale')
        .update({ boosting_rank: amount })
        .eq('id', propertyId);
      console.log(result1);
      showBoostModal = false;
      alert('Boosting successful!');
      goto('/properties');
    } catch (error) {
      console.log(error);
      alert('something went wrong');
    }
  };
</script>

<input type="text" bind:value={amtInput} class="amtInput" />
<button class="boostBtn" on:click={openBoostModal}>Boost Listing</button>

{#if showBoostModal}
  <BoostModal on:close={() => (showBoostModal = false)} {boostHandler} />
{/if}

<style lang="scss">
  .boostBtn {
    grid-column: 1 / -1;
    background: #bc6c25;
    padding: 15px;
    border-radius: 8px;
    color: white;
    margin-bottom: 32px;
  }
</style>
