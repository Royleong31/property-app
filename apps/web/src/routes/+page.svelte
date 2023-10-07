<script lang="ts">
  import { MyCounterButton } from "@myapp/ui";
  import type { HomePageProps } from "$lib/types/routes/root";

  export let data: HomePageProps;
  console.log(data);
</script>

<h1>{data.id}</h1>
<MyCounterButton />
