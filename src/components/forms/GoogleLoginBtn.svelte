<script lang="ts">
  import type { SupabaseClient } from '@supabase/supabase-js';

  export let supabase: SupabaseClient;
</script>

<button
  class="googleBtn"
  on:click|preventDefault={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
>
  <img
    class="w-6 h-6"
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    loading="lazy"
    alt="google logo"
  />
  <p>Login with Google</p></button
>

<style lang="scss">
  .googleBtn {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 6px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;

    img {
      width: 20px;
    }
  }
</style>
