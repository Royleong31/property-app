<script lang="ts">
  import { base } from '$app/paths';
</script>

<section class="landing">
  <div class="left">
    <h1>
      Find and explore your dream property at <span class="highlight">affordable</span> prices
    </h1>
    <p>
      Find your dream home with the most comprehensive resale property database, discover high-rise
      properties such as HDB, condo and apartment or landed property for sale in Singapore.
    </p>
  </div>

  <div class="right">
    <img src="{base}/landing.jpeg" alt="Landing page" />
  </div>
</section>

<style lang="scss">
  .landing {
    display: grid;
    grid-template-columns: 4fr 3fr;
    position: relative;
  }

  .left {
    background: #fefae0;
    padding: 2rem;
    padding-left: 10rem;

    h1 {
      font-family: Inter;
      font-size: 75px;
      font-style: normal;
      font-weight: 800;
      letter-spacing: 1.875px;

      span {
        color: #606c38;
      }
    }

    p {
      margin-top: 5rem;
      font-family: Inter;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      letter-spacing: 0.5px;
    }
  }

  .right {
    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }
</style>
