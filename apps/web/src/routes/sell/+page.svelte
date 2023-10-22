<script lang="ts">
</script>

<div class="header">
  <div class="container">
    <h2>Sell your property</h2>
    <p>Fill your property's information here</p>
  </div>
</div>

<form class="body">
  <h3>Personal Information</h3>
  <hr />

  <label for="fullName">Full Name:</label>
  <input type="text" id="fullName" />

  <label for="phoneNumber">Phone Number:</label>
  <input type="text" id="phoneNumber" />

  <label for="email">Email:</label>
  <input type="email" id="email" />

  <label for="NRIC">NRIC/FIN:</label>
  <input type="text" id="NRIC" />

  <h3>Property's Information</h3>
  <hr />

  <label for="postal">Postal code:</label>
  <input type="text" id="postal" />

  <label for="streetName">Street Name:</label>
  <input type="text" id="streetName" />

  <label class="bold" for="unitNum">Unit Number:</label>
  <input type="text" id="unitNum" />

  <label for="fullName">Type of property</label>
  <div class="select">
    <p class="option">Condo</p>
    <p class="option">Landed</p>
    <p class="option">HDB</p>
  </div>

  <label for="floorLevel">Floor level:</label>
  <input type="text" id="floorLevel" />

  <label for="bedrooms">No of bedrooms:</label>
  <input type="text" id="bedrooms" />

  <label for="bathrooms">No of bathrooms:</label>
  <input type="text" id="bathrooms" />

  <label for="area">Floor area:</label>
  <input type="text" id="area" />

  <label for="facility">Facilities</label>
  <div class="select">
    <p class="option">Car park</p>
    <p class="option">Balcony</p>
    <p class="option">Gym</p>
  </div>

  <hr />

  <div class="priceContainer">
    <div class="inputContainer">
      <p>Price</p>
      <div class="priceInput">
        <label for="price" class="priceLabel">S$</label>
        <input type="text" id="price" />
      </div>
    </div>

    <div class="divider" />

    <div class="inputContainer">
      <p>Image</p>
      <input type="file" id="fullName" />
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
      font-size: 12px;
    }
  }

  .body {
    max-width: 800px;
    margin: auto;
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 12px;

    & > h3,
    & > hr {
      grid-column: 1 / -1;
    }

    & > input {
      background: #f2f7fb;
      height: 32px;
      border: 1px solid #bbb;
      border-radius: 6px;
      flex: 1;
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
      }
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
  }
</style>
