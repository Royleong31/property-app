<script lang="ts">
  import type { SupabaseClient } from '@supabase/supabase-js';
  import Modal from './Modal.svelte';
  import { createEventDispatcher } from 'svelte';

  let fullName = '';
  let phoneNumber = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  export let supabase: SupabaseClient;

  const dispatch = createEventDispatcher();
  let errorMsg = '';

  function closeModal() {
    dispatch('close');
  }

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      errorMsg = 'Passwords do not match';
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // TODO: Add redirect url
      options: {},
    });

    if (data && data.user) {
      errorMsg = '';

      const result = await supabase.from('user').insert({
        full_name: fullName,
        phone_number: phoneNumber,
        id: data.user.id,
      });

      closeModal();
      return;
    }

    if (error?.message) {
      errorMsg = error.message;
      return;
    }

    errorMsg = 'Something went wrong. Please try again later.';
  };
</script>

<Modal {closeModal}>
  <h2 slot="header" class="logo">Register</h2>

  <form on:submit={handleRegister} class="loginModal">
    <input type="text" placeholder="Full Name" bind:value={fullName} id="fullName" />
    <input type="text" placeholder="Phone Number" bind:value={phoneNumber} id="phoneNumber" />
    <input type="email" placeholder="Email" bind:value={email} id="email" />
    <input type="password" placeholder="Password" bind:value={password} id="pw" />
    <input
      type="password"
      placeholder="Confirm Password"
      bind:value={confirmPassword}
      id="confirmPW"
    />

    <button class="submitBtn" type="submit">Register</button>

    <hr class="divider" />
    {#if errorMsg}
      <p class="error">{errorMsg}</p>
    {/if}
    <p class="loginFooterText">
      If you already have an account, please do log in
      <!-- svelte-ignore a11y-no-static-element-interactions -->
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
      height: 4px;
    }

    .loginFooterText {
      text-align: center;
    }

    .loginFooterLink {
      cursor: pointer;
      color: #283618;
    }
  }
  .error {
    color: red;
    text-align: center;
  }
</style>
