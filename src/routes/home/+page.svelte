<script lang="ts">
import Background from "$lib/components/background/Background.svelte";
import AboutUs from "$lib/components/about-us/AboutUs.svelte";
import Advantages from "$lib/components/advantages/Advantages.svelte";
import Banner from "$lib/components/banner/Banner.svelte";
import Services from "$lib/components/services/Services.svelte";
</script>
<div class="page">
    <Background/>
    <Banner/>
    <Services/>
    <AboutUs/>
    <Advantages/>
</div>

<style lang="scss">
    .page{
      display: flex;
      flex-direction: column;
      width: 100%;
    }
</style>