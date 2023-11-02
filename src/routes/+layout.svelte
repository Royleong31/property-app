<script lang="ts">
  import { base } from '$app/paths';
  import { ModalType } from '$lib/enums/modals';
  import LoginModal from '../components/modals/LoginModal.svelte';
  import RegisterModal from '../components/modals/RegisterModal.svelte';
  import { invalidate } from '$app/navigation';
  import { onMount } from 'svelte';
  import { SUPABASE_AUTH } from '$lib/constants';
  import authStore from '$lib/store/auth';
  import ChangePasswordModal from '../components/modals/ChangePasswordModal.svelte';

  export let data;

  $: supabase = data.supabase;
  $: originUrl = (data as any).originUrl as string;

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((event, _session) => {
      if (event === 'SIGNED_OUT') {
        authStore.set(null);
        invalidate(SUPABASE_AUTH);
      } else if (_session?.user) {
        authStore.set(_session.user);
      }
    });

    return () => data.subscription.unsubscribe();
  });

  const onClose = () => {
    modalType = ModalType.NONE;
  };
  let modalType = ModalType.NONE;
</script>

<svelte:head>
  <title>User Management</title>
</svelte:head>

<div class="root">
  <header>
    <div class="container">
      <div class="headerLeftContainer">
        <a href="/">
          <p class="logo">Home<br />Price</p>
        </a>

        <a href="/properties">Properties</a>
        <a href="/sell">Sell</a>
        <a href="/chat">Chat</a>
        <a href="/prediction">Prediction</a>
      </div>

      <div class="headerRightContainer">
        {#if $authStore}
          <button
            on:click={() => {
              supabase.auth.signOut();
            }}
            class="registerBtn">Sign Out</button
          >
          <button
            on:click={() => {
              modalType = ModalType.CHANGE_PASSWORD;
            }}
            class="registerBtn">Change PW</button
          >
        {:else}
          <button
            on:click={() => {
              modalType = ModalType.LOGIN;
            }}
            class="loginBtn">Log In</button
          >
          <button
            on:click={() => {
              modalType = ModalType.REGISTER;
            }}
            class="registerBtn">Register</button
          >
        {/if}
      </div>
    </div>
  </header>

  <main>
    <slot />
  </main>

  {#if modalType === ModalType.LOGIN}
    <LoginModal {supabase} redirectUrl={`${originUrl}/auth/callback`} on:close={onClose} />
  {:else if modalType === ModalType.REGISTER}
    <RegisterModal {supabase} on:close={onClose} />
  {:else if modalType === ModalType.CHANGE_PASSWORD}
    <ChangePasswordModal {supabase} on:close={onClose} />
  {/if}

  <footer>
    <div class="container">
      <div class="footerLeftContainer">
        <a href="/">
          <p class="logo">Home<br />Price</p>
        </a>
        <a href="/">Terms</a>
        <a href="/">Privacy</a>
        <a href="/">Cookies</a>
      </div>

      <div class="footerRightContainer">
        <div class="icon">
          <img src={`${base}/facebook.svg`} alt="Facebook icon" />
        </div>
        <div class="icon">
          <img src={`${base}/instagram.svg`} alt="Instagram icon" />
        </div>

        <div class="icon">
          <img src={`${base}/linkedIn.svg`} alt="Linked In icon" />
        </div>
      </div>
    </div>
  </footer>
</div>

<style lang="scss">
  .root {
    display: grid;
    grid-template-rows: max-content 1fr max-content;
    min-height: 100vh;
    font-family: Inter;
    align-content: center;
  }

  .logo {
    color: #606c38;
    font-size: 25px;
    font-weight: 900;
    line-height: 25px;
    font-family: Saira;
    text-transform: capitalize;
    text-align: center;
  }

  /* TODO: Move this to a shared style */
  .container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: auto;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  header {
    background: white;

    padding: 1.5rem 2rem;

    .headerLeftContainer {
      display: flex;
      align-items: center;
      column-gap: 2rem;

      a {
        color: #000;
        font-family: Inter;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: 25px; /* 104.167% */
        text-transform: capitalize;
      }
    }

    .headerRightContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 1rem;

      button {
        border-radius: 12px;
        background: yellow;
        padding: 0.2rem 1.5rem;
        height: 48px;
        font-weight: 500;
        font-size: 24px;
      }

      .loginBtn {
        background: #fefae0;
        color: black;
      }

      .registerBtn {
        background: #606c38;
        color: #fefae0;
      }
    }
  }

  footer {
    background: #bc6c25;

    padding: 1.5rem 2rem;

    .footerLeftContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 2rem;

      color: white;
    }

    .footerRightContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 1rem;
    }
  }
</style>
