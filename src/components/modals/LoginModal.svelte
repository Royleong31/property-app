<script lang="ts">
  import { Auth } from '@supabase/auth-ui-svelte';
  import Modal from './Modal.svelte';
  import type { SupabaseClient } from '@supabase/supabase-js';
  import { ThemeSupa } from '@supabase/auth-ui-shared';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let email = '';
  let password = '';
  let errorMsg = '';
  export let supabase: SupabaseClient;
  export let redirectUrl: string;

  function closeModal() {
    dispatch('close');
  }

  const handleLogin = async () => {
    const response = await supabase.auth.signInWithPassword({ email, password });
    if (response.data.user) {
      closeModal();
      return;
    } else if (response.error) {
      errorMsg = response.error.message;
    }
  };
</script>

<Modal {closeModal}>
  <h2 slot="header" class="logo">Log In</h2>

  <form on:submit={handleLogin} class="loginModal">
    <input type="email" placeholder="Email" bind:value={email} id="email" />
    <input type="password" placeholder="Password" bind:value={password} id="pw" />

    <button class="submitBtn" type="submit">Log In</button>

    <hr class="divider" />

    {#if errorMsg}
      <p class="error">{errorMsg}</p>
    {/if}

    <p class="loginFooterText">
      If you already have an account, please do log in
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span class="loginFooterLink" on:click={() => {}}>here</span>
    </p>
  </form>
</Modal>

<style lang="scss">
  .logo {
    color: #606c38;
    font-size: 25px;
    font-weight: 900;
    line-height: 25px;
    font-family: Saira;
    text-transform: capitalize;
    text-align: center;
  }

  .loginModal {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    justify-content: center;

    input {
      background: white;
      border-radius: 10px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
      padding: 1rem 2rem;
      width: 30rem;
      max-width: 100%;
    }

    .submitBtn {
      background: #283618;
      border-radius: 6px;
      width: max-content;
      padding: 0.5rem 2rem;
      color: white;
      align-self: center;
    }

    .divider {
      background-color: #283618;
      height: 1px;
      border: none;
    }

    .loginFooterText {
      text-align: center;
    }

    .loginFooterLink {
      cursor: pointer;
      color: blue;
    }
  }
  .error {
    color: red;
    text-align: center;
  }
</style>
