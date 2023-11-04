<script lang="ts">
  import { base } from '$app/paths';

  export let data;
  const propertyData = data.propertyData;

  let price = '';
  let loanAmount = '';
  let interestRate = '';
  let tenure = '';

  let monthlyRepayment = 0;
  let principalAmt = 0;
  let interestAmt = 0;
  let downpaymentAmt = 0;
  let downpaymentPercentage = '0';
  let loanPercentage = '0';
  let percentagePrincipal = '0';
  let percentageInterest = '0';
  let loanAmountVal = '0'

  function capitalizeFirstLetter(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  function submitHandler() {
    const priceNum = Number(price);
    const loanAmountNum = Number(loanAmount);
    const interestRateNum = Number(interestRate);
    const tenureNum = Number(tenure);

    const monthlyInterestRate = interestRateNum / 12 / 100;
    const numberOfMonths = tenureNum * 12;

    monthlyRepayment =
      (loanAmountNum * (monthlyInterestRate * (1 + monthlyInterestRate) ** numberOfMonths)) /
      ((1 + monthlyInterestRate) ** numberOfMonths - 1);

    const totalAmtPaid = monthlyRepayment * numberOfMonths;
    principalAmt = loanAmountNum / numberOfMonths;
    interestAmt = monthlyRepayment - principalAmt;
    loanAmountVal = loanAmount

    downpaymentAmt = priceNum - loanAmountNum;
    downpaymentPercentage = ((downpaymentAmt / priceNum) * 100).toFixed(2);
    loanPercentage = (100 - +downpaymentPercentage).toFixed(2);
    percentagePrincipal = ((loanAmountNum / totalAmtPaid) * 100).toFixed(2);
    percentageInterest = (100 - +percentagePrincipal).toFixed(2);

    console.log({
      monthlyRepayment,
      principalAmt,
      interestAmt,
      downpaymentAmt,
      downpaymentPercentage,
      totalAmtPaid,
      loanPercentage,
      percentagePrincipal,
    });
  }

  console.log(propertyData);
</script>

<div class="container">
  <div class="imgGrid">
    <img src={propertyData.property_images[0].image_url} alt="" class="img1" />
    <!-- <img src="{base}/houses/display/display-img-2.png" alt="" class="img2" />
    <img src="{base}/houses/display/display-img-3.png" alt="" class="img3" /> -->
  </div>

  <div class="info">
    <h3 class="name">{propertyData.street_name} {propertyData.unit_number}</h3>
    <div class="likeContainer">
      <p class="address">{propertyData.street_name}, Singapore</p>
      <!-- TODO: Add a like -->
      <div class="like" />
    </div>

    <div class="tags">
      <div class="tag">{propertyData.type_of_property}</div>
    </div>

    <hr class="divider" />

    <div class="details">
      <div class="leftDetails">
        <h4 class="price">
          S{new Intl.NumberFormat('en-SG', {
            style: 'currency',
            currency: 'SGD',
            minimumFractionDigits: 0,
          }).format(propertyData.price)}
        </h4>
        <p class="repayment">
          Est. Repayment S{new Intl.NumberFormat('en-SG', {
            style: 'currency',
            currency: 'SGD',
            minimumFractionDigits: 0,
          }).format(propertyData.price / 200)} / month
        </p>
      </div>

      <div class="detailsDivider" />

      <div class="rightDetails">
        <div class="detail">
          <img src="{base}/icons/bed.svg" alt="" />
          <p class="detailText">{propertyData.no_of_bedrooms} bed</p>
        </div>
        <div class="detail">
          <img src="{base}/icons/bathroom.svg" alt="" />
          <p class="detailText">{propertyData.no_of_bathrooms} bath</p>
        </div>
        <div class="detail">
          <img src="{base}/icons/area.svg" alt="" />
          <p class="detailText">{propertyData.floor_area} sqm</p>
        </div>
      </div>
    </div>

    <hr class="divider" />

    <h5>Amenities</h5>
    <div class="amenities">
      {#if propertyData.facilities.length > 0}
        <p>Unit Features</p>
        <div class="features">
          {#each propertyData.facilities as facility}
            <div class="amenity">
              <img src="{base}/icons/tick.svg" alt="" />
              <p>{capitalizeFirstLetter(facility.toLowerCase().replace('_', ' '))}</p>
            </div>
          {/each}
        </div>

        <hr />
        <hr />
        <p>Facilities</p>
      {/if}
      <div class="features">
        <div class="amenity">
          <img src="{base}/icons/carpark.svg" alt="" />
          <p>Car park</p>
        </div>
        <div class="amenity">
          <img src="{base}/icons/security.svg" alt="" />
          <p>24 hours security</p>
        </div>
      </div>
    </div>
  </div>
  <hr class="divider" />

  <h5>Estimated Mortgage</h5>
  <form class="mortgageContainer" on:submit|preventDefault={submitHandler}>
    <div class="mortgageCalculator">
      <h6>Mortgage Breakdown</h6>
      <div class="subheader">
        <p class="left">Est. Monthly Repayment</p>
        <p class="right">
          S{new Intl.NumberFormat('en-SG', {
            style: 'currency',
            currency: 'SGD',
            minimumFractionDigits: 2,
          }).format(monthlyRepayment)} / mo
        </p>
      </div>
      <div class="percentageContainer">
        <div class="filled" style="width:{percentagePrincipal}%">
          <p>{percentagePrincipal}%</p>
        </div>
        <div class="unfilled" style="width:{percentageInterest}%">
          <p>{percentageInterest}%</p>
        </div>
      </div>

      <div class="amounts">
        <p class="amount">
          S{new Intl.NumberFormat('en-SG', {
            style: 'currency',
            currency: 'SGD',
            minimumFractionDigits: 2,
          }).format(principalAmt)} Principal
        </p>
        <p class="amount">
          S{new Intl.NumberFormat('en-SG', {
            style: 'currency',
            currency: 'SGD',
            minimumFractionDigits: 2,
          }).format(interestAmt)} Interest
        </p>
      </div>

      <hr />

      <h6>Upfront Costs</h6>
      <div class="subheader">
        <p class="left">Total Downpayment</p>
        <p class="right">
          S{new Intl.NumberFormat('en-SG', {
            style: 'currency',
            currency: 'SGD',
            minimumFractionDigits: 2,
          }).format(downpaymentAmt)}
        </p>
      </div>
      <div class="percentageContainer">
        <div class="filled" style="width:{downpaymentPercentage}%">
          <p>{downpaymentPercentage}%</p>
        </div>
        <div class="unfilled" style="width:{loanPercentage}%">
          <p>{loanPercentage}%</p>
        </div>
      </div>

      <div class="amounts">
        <p class="amount">Downpayment</p>
        <p class="amount">
          S{new Intl.NumberFormat('en-SG', {
            style: 'currency',
            currency: 'SGD',
            minimumFractionDigits: 2,
          }).format(+loanAmount)} Loan Amount<br />at {loanPercentage}% Loan-to-Amount
        </p>
      </div>
    </div>

    <div class="mortgageInput">
      <div class="mortgageInputContainer fullWidthInput">
        <label for="price">Property Price</label>
        <div class="inputContainer">
          <div class="unit"><p>S$</p></div>
          <input type="text" id="price" bind:value={price} />
        </div>
      </div>

      <div class="mortgageInputContainer fullWidthInput">
        <label for="loan">Loan Amount</label>
        <div class="inputContainer">
          <div class="unit"><p>S$</p></div>
          <input type="text" id="loan" bind:value={loanAmount} />
        </div>
      </div>

      <div class="mortgageInputContainer">
        <label for="interestRate">Interest Rate</label>
        <div class="inputContainer">
          <div class="unit"><p>%</p></div>
          <input type="text" id="interestRate" bind:value={interestRate} />
        </div>
      </div>

      <div class="mortgageInputContainer">
        <label for="loanTenure">Loan Tenure</label>
        <div class="inputContainer">
          <div class="unit"><p>Yrs</p></div>
          <input type="text" id="loanTenure" bind:value={tenure} />
        </div>
      </div>

      <button
        class="calculateBtn"
        disabled={price === '' || loanAmount === '' || interestRate === '' || tenure === ''}
        >Calculate</button
      >
    </div>
  </form>

  <div />
</div>

<style lang="scss">
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    max-width: 1200px;
    margin: auto;
    row-gap: 16px;
  }

  .divider {
    border: none;
    border-top: 1.5px solid black;
  }

  h5 {
    font-size: 28px;
  }

  .imgGrid {
    /* display: grid;
    grid-template-areas:
      'img1 img1 img1 img2'
      'img1 img1 img1 img3';
    gap: 16px; */
    /* height: 500px; */
    display: flex;
    justify-content: center;
    width: 200px;
    width: 100%;

    .img1,
    .img2,
    .img3 {
      width: 100%;
      max-width: 500px;
      margin: auto;
      border-radius: 6px;
      object-fit: cover;
    }

    .img1 {
      grid-area: img1;
      /* height: 500px; */
    }

    .img2 {
      grid-area: img2;
      height: calc(250px - 8px);
    }

    .img3 {
      grid-area: img3;
      height: calc(250px - 8px);
    }
  }

  .info {
    width: 100%;
    row-gap: 10px;
    display: flex;
    flex-direction: column;

    .name {
      font-size: 24px;
    }

    & > .likeContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .address {
        font-size: 16px;
        color: #444;
      }

      .like {
        width: 24px;
        height: 24px;
      }
    }

    & > .tags {
      display: flex;
      column-gap: 10px;

      .tag {
        padding: 5px 10px;
        border-radius: 6px;
        background: #d9d9d9;
      }
    }

    .details {
      display: grid;
      grid-template-columns: 1fr min-content 1fr;

      & > .detailsDivider {
        align-self: stretch;
        border-left: 1px solid black;
      }

      & > .leftDetails {
        .price {
          font-size: 36px;
          font-weight: bold;
        }

        .repayment {
          margin-top: 12px;
        }
      }

      & > .rightDetails {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        text-align: center;

        img {
          height: 48px;
          width: 48px;
        }
      }
    }

    .amenities {
      display: grid;
      grid-template-columns: max-content 1fr;
      column-gap: 48px;
      row-gap: 24px;

      & > .features {
        display: flex;
        column-gap: 16px;
        row-gap: 10px;
        flex-wrap: wrap;

        .amenity {
          display: flex;
          align-items: center;

          img {
            width: 24px;
            height: 24px;
            margin-right: 4px;
          }
        }
      }
    }
  }

  .mortgageContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 24px;
    margin-bottom: 32px;

    .mortgageCalculator {
      border: 1px solid #888;
      border-radius: 6px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      row-gap: 8px;

      h6 {
        font-size: 20px;
      }

      .subheader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 4px 0;

        .right {
          font-weight: bold;
        }
      }

      .amounts {
        display: flex;
        justify-content: space-between;
      }

      & > hr {
        margin: 10px 0;
      }

      .percentageContainer {
        height: 32px;
        display: flex;
        overflow: hidden;
        border-radius: 6px;

        .filled,
        .unfilled {
          position: relative;
          height: 100%;

          & > p {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }

        .filled {
          background: #606c38;
        }

        .unfilled {
          background: #fefae0;
        }
      }

      .amount {
        font-weight: bold;
      }
    }
  }

  .mortgageInput {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: min-content;
    gap: 24px;

    .fullWidthInput {
      grid-column: 1 / -1;
    }

    .mortgageInputContainer {
      display: flex;
      flex-direction: column;

      label {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .inputContainer {
        display: flex;
        width: 100%;
        border-radius: 6px;
        overflow: hidden;
        height: 50px;

        .unit {
          height: 100%;
          border: 1px solid black;

          border-radius: 6px 0 0 6px;
          display: grid;
          place-items: center;
          width: 60px;
          background: #eee;
        }

        & > input {
          height: 100%;
          background: #e7e7e7;
          width: 100%;
          padding: 0 10px;
          font-size: 20px;
        }
      }
    }

    .calculateBtn {
      margin: auto;
      grid-column: 1/ -1;
      width: 100%;
      padding: 10px;
      background: #606c38;
      color: white;
      border-radius: 6px;

      &:disabled {
        opacity: 0.6;
      }
    }
  }
</style>
