<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  let dialog: HTMLDialogElement;
  const dispatch = createEventDispatcher();

  function closeModal() {
    dialog.close();
    dispatch('close');
  }

  $: if (dialog) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog bind:this={dialog} on:close={closeModal} on:click|self={closeModal}>
  <div class="root" on:click|stopPropagation>
    <!-- svelte-ignore a11y-autofocus -->
    <button class="closeBtn" autofocus on:click={closeModal}>X</button>

    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div>
      <slot name="header" />
      <hr class="headerHR" />
      <slot />
    </div>
  </div>
</dialog>

<style>
  .root {
    padding: 2rem;
    background: #fefae0ae;
  }

  .headerHR {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  .closeBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-weight: bold;
  }

  dialog {
    position: relative;
    max-width: 32em;
    border-radius: 0.2em;
    border: none;
    position: fixed;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 8px;
  }
  dialog::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }

  dialog[open] {
    /* animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); */
  }
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  button {
    display: block;
  }
</style>
