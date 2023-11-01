<script lang="ts">
  import { Auth } from '@supabase/auth-ui-svelte';
  import { ThemeSupa } from '@supabase/auth-ui-shared';

  export let data;
</script>

<svelte:head>
  <title>User Management</title>
</svelte:head>

<div class="container">
  <div class="card">
    <Auth
      supabaseClient={data.supabase}
      view="sign_in"
      redirectTo={`${data.url}/auth/callback`}
      providers={['google', 'facebook']}
      showLinks={false}
      appearance={{ theme: ThemeSupa }}
    />
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
  }

  .card {
    width: 100%;
    max-width: 500px;
    padding: 12px 16px;
    background: #fefae0ae;
    border-radius: 6px;
  }
</style>
