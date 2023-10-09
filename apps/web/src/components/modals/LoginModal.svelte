<script lang="ts">
  import Modal from './Modal.svelte';

  let email = '';
  let password = '';

  const handleLogin = () => {};
</script>

<Modal on:close>
  <h2 slot="header" class="logo">Log In</h2>

  <form on:submit={handleLogin} class="loginModal">
    <input type="email" placeholder="Email" bind:value={email} id="email" />
    <input type="password" placeholder="Password" bind:value={password} id="pw" />

    <button class="submitBtn" type="submit">Log In</button>

    <hr class="divider" />
    <p class="loginFooterText">
      If you already have an account, please do log in
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <span
        class="loginFooterLink"
        on:click={() => {
          console.log('log in');
        }}>here</span
      >
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
</style>
