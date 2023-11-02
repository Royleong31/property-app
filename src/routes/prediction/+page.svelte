<script lang="ts">
  import Chart from 'svelte-frappe-charts';
  import LandingComponent from '../../components/LandingComponent.svelte';
  const bedroomSelectOptions = ['1', '2', '3', '4', '5', '6+'];

  let data = {
    labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    datasets: [
      {
        values: [10, 12, 3, 9, 8, 15, 9],
      },
    ],
  };

  const predictedPrice = 1000000
</script>

<LandingComponent />
<div class="container">
  <div class="selectorContainer">
    <div>
      <label for="town" class="label">Town:</label>
      <select name="town" id="town" class="selector">
        <option value="Ang Mo Kio">Ang Mo Kio</option>
        <option value="Bedok">Bedok</option>
        <option value="Clementi">Clementi</option>
      </select>
    </div>

    <div>
      <label for="roomCount" class="label">Number of bedrooms:</label>
      <select name="roomCount" id="roomCount" class="selector">
        {#each bedroomSelectOptions as option}
          <option value={option}>
            {option}
          </option>
        {/each}
      </select>
    </div>
  </div>
  <Chart {data} type="line" />

  <h3 class="predictedPrice">
    Predicted price: S{new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD',
      maximumFractionDigits: 0,
    }).format(predictedPrice)}
  </h3>
</div>

<style lang="scss">
  .container {
    max-width: 1200px;
    margin: auto;
    padding: 50px 0;
  }

  .label {
    font-size: 20px;
  }

  .selectorContainer {
    display: flex;
    column-gap: 50px;
  }

  .selector {
    border: 1px solid #333;
    padding: 5px 10px;
    border-radius: 6px;
    background: #efefef;
    cursor: pointer;
  }
</style>
