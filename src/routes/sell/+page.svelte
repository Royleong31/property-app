<script lang="ts">
  import DisplayImage from '../../components/forms/DisplayImage.svelte';
  import authStore from '$lib/store/auth';
  import { goto } from '$app/navigation';

  export let data;
  $: ({ supabase } = data);
  enum PropertyType {
    CONDO = 'CONDO',
    LANDED = 'LANDED',
    HDB = 'HDB',
  }

  enum Facilities {
    CAR_PARK = 'CAR_PARK',
    BALCONY = 'BALCONY',
    GYM = 'GYM',
  }

  let postal = '';
  let streetName = '';
  let unitNum = '';
  let typeOfProperty: PropertyType = PropertyType.HDB;
  let floorLevel = '';
  let noOfBedrooms = '';
  let noOfBathrooms = '';
  let floorArea = '';
  let facilities: Facilities[] = [];
  let price = '';
  let url = '';

  const submitHandler = async () => {
    if (!$authStore?.id) {
      // TODO: Open login modal
      alert('you are not logged in');
      return;
    }

    const result = await supabase
      .from('property_for_sale')
      .insert({
        seller_id: $authStore.id,
        postal_code: postal,
        street_name: streetName,
        unit_number: unitNum,
        type_of_property: 'CONDO',
        floor_level: floorLevel,
        no_of_bedrooms: noOfBedrooms,
        no_of_bathrooms: noOfBathrooms,
        floor_area: floorArea,
        facilities: facilities,
        price,
      })
      .select('*');

    if (result.data && result.data[0]) {
      const result2 = await supabase.from('property_images').insert({
        image_url: url,
        property_id: result.data[0].id,
      });

      if (result2) {
        alert('success');

        postal = '';
        streetName = '';
        unitNum = '';
        typeOfProperty = PropertyType.HDB;
        floorLevel = '';
        noOfBedrooms = '';
        noOfBathrooms = '';
        floorArea = '';
        facilities = [];
        price = '';
        url = '';
      } else {
        alert('something went wrong, please try again');
      }
    }

    goto('/');
  };

  const selectFacility = (facility: Facilities) => {
    if (facilities.includes(facility)) {
      facilities = facilities.filter(f => f !== facility);
    } else {
      facilities = [...facilities, facility];
    }
  };
</script>

<div class="header">
  <div class="container">
    <h2>Sell your property</h2>
    <p>Fill your property's information here</p>
  </div>
</div>

<form class="body" on:submit|preventDefault={submitHandler}>
  <h3 class="title">Property Information</h3>
  <hr />

  <label for="postal">Postal code:</label>
  <input bind:value={postal} type="text" id="postal" />

  <label for="streetName">Street Name:</label>
  <input bind:value={streetName} type="text" id="streetName" />

  <label class="bold" for="unitNum">Unit Number:</label>
  <input bind:value={unitNum} type="text" id="unitNum" />

  <label for="fullName">Type of property</label>
  <div class="select">
    <button
      on:click={() => (typeOfProperty = PropertyType.CONDO)}
      type="button"
      class={`option ${typeOfProperty === PropertyType.CONDO ? 'selected' : ''}`}>Condo</button
    >
    <button
      on:click={() => (typeOfProperty = PropertyType.LANDED)}
      type="button"
      class={`option ${typeOfProperty === PropertyType.LANDED ? 'selected' : ''}`}>Landed</button
    >
    <button
      on:click={() => (typeOfProperty = PropertyType.HDB)}
      type="button"
      class={`option ${typeOfProperty === PropertyType.HDB ? 'selected' : ''}`}>HDB</button
    >
  </div>

  <label for="floorLevel">Floor level:</label>
  <input bind:value={floorLevel} type="text" id="floorLevel" />

  <label for="bedrooms">No of bedrooms:</label>
  <input bind:value={noOfBedrooms} type="number" id="bedrooms" />

  <label for="bathrooms">No of bathrooms:</label>
  <input bind:value={noOfBathrooms} type="number" id="bathrooms" />

  <label for="area">Floor area:</label>
  <input bind:value={floorArea} type="number" id="area" />

  <label for="facility">Facilities</label>
  <div class="select">
    <button
      type="button"
      on:click={() => selectFacility(Facilities.CAR_PARK)}
      class={`option ${facilities.includes(Facilities.CAR_PARK) ? 'selected' : ''}`}
    >
      Car park
    </button>
    <button
      type="button"
      on:click={() => selectFacility(Facilities.BALCONY)}
      class={`option ${facilities.includes(Facilities.BALCONY) ? 'selected' : ''}`}
    >
      Balcony
    </button>
    <button
      type="button"
      on:click={() => selectFacility(Facilities.GYM)}
      class={`option ${facilities.includes(Facilities.GYM) ? 'selected' : ''}`}
    >
      Gym
    </button>
  </div>

  <hr />

  <div class="priceContainer">
    <div class="inputContainer">
      <p>Price</p>
      <div class="priceInput">
        <label for="price" class="priceLabel">S$</label>
        <input bind:value={price} type="text" id="price" />
      </div>
    </div>

    <div class="divider" />

    <div class="inputContainer">
      <p>Image</p>

      <DisplayImage
        supabase={data.supabase}
        onUpload={val => {
          url = val;
        }}
      />
    </div>
  </div>

  <button class="submit" type="submit">Submit</button>
</form>

<style lang="scss">
  .header {
    background: #fefae0;
    padding: 2rem 0;
    margin-bottom: 32px;
  }

  .container {
    max-width: 1200px;
    margin: auto;

    & > p {
      font-size: 10px;
      margin-top: 8px;
    }
  }

  .body {
    max-width: 800px;
    margin: auto;
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 24px;

    & > h3,
    & > hr {
      grid-column: 1 / -1;
    }

    .title {
      font-size: 20px;
    }

    & > input {
      background: #f2f7fb;
      border: 1px solid #bbb;
      border-radius: 6px;
      flex: 1;
      padding: 5px 12px;
    }

    hr {
      width: 100px;
    }
  }

  .priceContainer {
    grid-column: 1 / -1;
    background: #eee;
    border-radius: 6px;
    padding: 12px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr min-content 1fr;
    text-align: center;
    font-weight: bold;
    justify-items: center;

    & > .inputContainer {
      display: flex;
      flex-direction: column;
      width: min-content;
      row-gap: 1rem;
    }

    .divider {
      border-right: 1px solid black;
    }
  }

  .priceInput {
    display: flex;

    & > input {
      border: 1px solid #ccc;
      border-radius: 0 6px 6px 0;
      padding: 0 12px;
      background: #f2f7fb;
      height: 32px;
    }

    .priceLabel {
      border: 1px solid black;
      border-radius: 6px 0 0 6px;
      padding: 0 12px;
      background: #f2f7fb;
      display: flex;
      align-items: center;
    }
  }

  .submit {
    grid-column: 1 / -1;
    padding: 10px 10px;
    background: #bc6c25;
    margin-bottom: 50px;
    color: white;
    &:disabled {
      background: gray;
    }
    border-radius: 6px;
    cursor: pointer;
  }

  .select {
    display: flex;
    column-gap: 12px;

    & > .option {
      min-width: 80px;
      padding: 5px 10px;
      background: white;
      border-radius: 6px;
      border: 1px solid black;
      color: #333;
      text-align: center;

      &.selected {
        background: #333;
        color: white;
      }
    }
  }
</style>
