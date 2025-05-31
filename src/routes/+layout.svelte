<script lang="ts">
    import { onMount } from 'svelte';
    import '../app.css';
    import PageContainer from "$lib/components/page-container/PageContainer.svelte";
    import Meta from "../lib/components/library/Meta/Meta.svelte";
    import Header from "$lib/components/header/Header.svelte";
    import Footer from "$lib/components/footer/Footer.svelte";
    import Loader from "$lib/components/Loader.svelte";

    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();
    let isLoading = $state(true);

    onMount(() => {
        // Wait for DOM to be fully loaded and rendered
        setTimeout(() => {
            isLoading = false;
        }, 2000); // 2 seconds - adjust as needed
    });
</script>

<Meta/>

<!-- Fullscreen Loader -->
<Loader {isLoading} />

<!-- Main Content -->
{#if !isLoading}
    <div class="main">
        <Header/>
        <div class="main-container">
            <PageContainer>
                {@render children?.()}
            </PageContainer>
        </div>
        <Footer/>
    </div>
{/if}

<style lang="scss">
  .main {
    background: var(--White-600, #FFF);
  }

  .main-container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    overflow: hidden;
    position: relative;

    @media screen and (max-width: 768px) {
      overflow-x: auto;

      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 3rem;
        pointer-events: none;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.01) 0%, rgba(115, 115, 115, 0.12) 100%);
      }
    }

    .content-container {
      max-width: 1920px;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
</style>