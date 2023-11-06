<script lang="ts">
  import { Auth } from '@supabase/auth-ui-svelte';
  import Modal from './Modal.svelte';
  import type { SupabaseClient } from '@supabase/supabase-js';
  import { ThemeSupa } from '@supabase/auth-ui-shared';
  import { createEventDispatcher } from 'svelte';
  import { loadScript } from '@paypal/paypal-js';

  const dispatch = createEventDispatcher();

  let amtInput = '';
  export let boostHandler: (amount: number) => Promise<void>;

  function closeModal() {
    dispatch('close');
  }

  const CLIENT_ID =
    'ATEt32a21f3NXSr8YtWVLxfr_eJnVgi5F38kCyWOggKQBdWqqqYMdn6Q5TWhfQy5CH7x8ykP0NUkpHNO';
  loadScript({ 'client-id': CLIENT_ID, currency: 'SGD' }).then(paypal => {
    paypal
      .Buttons({
        style: {
          color: 'blue',
          shape: 'pill',
        },
        createOrder: function (data, actions) {
          // Set up the transaction
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  value: amtInput,
                  currency_code: 'SGD',
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          // Capture order after payment approved
          return actions.order.capture().then(async function (details) {
            console.log(JSON.stringify(details));
            const amountPaid = details.purchase_units[0].payments?.captures[0].amount.value;
            await boostHandler(+amountPaid);
          });
        },
        onError: function (err) {
          // Log error if something goes wrong during approval
          alert('Something went wrong');
          console.log('Something went wrong', err);
        },
      })
      .render('#paypal-button-container');
  });
</script>

<Modal {closeModal}>
  <h2 slot="header" class="logo">Boost Listing</h2>

  <form class="loginModal">
    <input placeholder="Boost amount" bind:value={amtInput} type="number" id="email" />
    <div id="paypal-button-container" />
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
