<script lang="ts">
  import Chart from 'svelte-frappe-charts';
  import LandingComponent from '../../components/LandingComponent.svelte';
  import Layout from '../+layout.svelte';
  const bedroomSelectOptions = ['1', '2', '3', '4', '5'];

  const towns = [
    'ang mo kio',
    'bedok',
    'bishan',
    'bukit batok',
    'bukit merah',
    'bukit panjang',
    'bukit timah',
    'central',
    'choa chu kang',
    'clementi',
    'geylang',
    'hougang',
    'jurong east',
    'jurong west',
    'kallang/whampoa',
    'marine parade',
    'pasir ris',
    'punggol',
    'queenstown',
    'sembawang',
    'sengkang',
    'serangoon',
    'tampines',
    'toa payoh',
    'woodlands',
    'yishun',
    'central area',
  ];

  let data = {
    labels: [
      '2019-Q1',
      '2019-Q2',
      '2019-Q3',
      '2019-Q4',
      '2020-Q1',
      '2020-Q2',
      '2020-Q3',
      '2020-Q4',
      '2021-Q1',
      '2021-Q2',
      '2021-Q3',
      '2021-Q4',
      '2022-Q1',
      '2022-Q2',
      '2022-Q3',
      '2022-Q4',
      '2023-Q1',
      '2023-Q2',
    ],
    datasets: [
      {
        values: [10, 12, 3, 9, 8, 15, 90],
      },
    ],
  };

  let predictedPrice = 0;

  let town = towns[0];
  let room = bedroomSelectOptions[2];
  // 165.22.109.188
  const base_url = 'http://157.230.242.109';
  $: {
    try {
      fetch(`${base_url}/estimate_price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          town,
          num_rooms: +room,
        }),
      })
        .then(res => res.json())
        .then(res => {
          predictedPrice = res.predicted_price;
        });

      fetch(`${base_url}/get_prices?town=${town}&num_rooms=${+room}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(res => {
          const labels: string[] = [];
          const datasets: { values: number[] }[] = [{ values: [] }];

          res.past_prices.forEach((val: any) => {
            if (!isNaN(val.price)) {
              labels.push(val.quarter);
              datasets[0].values.push(val.price);
            }
          });

          console.log(labels, datasets[0].values);

          data = {
            labels,
            datasets,
          };
        })
        .catch(() => {
          data = {
            labels: [],
            datasets: [
              {
                values: [],
              },
            ],
          };
        });
    } catch (error) {
      console.log('error occred');
      console.log(error);
    }
  }
</script>

<LandingComponent />
<div class="container">
  <div class="selectorContainer">
    <div>
      <label for="town" class="label">Town:</label>
      <select name="town" id="town" class="selector" bind:value={town}>
        {#each towns as town}
          <option value={town}>{town}</option>
        {/each}
      </select>
    </div>

    <div>
      <label for="roomCount" class="label">Number of bedrooms:</label>
      <select name="roomCount" id="roomCount" class="selector" bind:value={room}>
        {#each bedroomSelectOptions as option}
          <option value={option}>
            {option}
          </option>
        {/each}
      </select>
    </div>
  </div>

  {#if data.labels.length === 0}
    <div class="noData">
      <p>No data available</p>
    </div>
  {:else}
    <Chart {data} type="line" />
  {/if}

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

  .noData {
    display: grid;
    place-items: center;
    height: 200px;
    border: 1px dashed #333;
    margin: 20px 0;
  }

  .selector {
    border: 1px solid #333;
    padding: 5px 10px;
    border-radius: 6px;
    background: #efefef;
    cursor: pointer;
  }
</style>
