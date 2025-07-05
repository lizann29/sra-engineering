<script lang="ts">
    import { onMount } from 'svelte';
    import '../app.css';
    import PageContainer from "$lib/components/page-container/PageContainer.svelte";
    import Meta from "../lib/components/library/Meta/Meta.svelte";
    import Header from "$lib/components/header/Header.svelte";
    import Footer from "$lib/components/footer/Footer.svelte";
    import Loader from "$lib/components/loader/Loader.svelte";
    import { initTranslations, getStoredLanguage } from '$lib/stores/translations.js';

    interface Props {
        children?: import('svelte').Snippet;
        data?: any;
    }

    let { children, data }: Props = $props();
    let isLoading = $state(true);

    async function waitForResources() {
        if (document.readyState !== 'complete') {
            await new Promise(resolve => {
                if (document.readyState === 'complete') {
                    resolve(void 0);
                } else {
                    window.addEventListener('load', () => resolve(void 0), { once: true });
                }
            });
        }

        // Wait for images to load
        const images = document.querySelectorAll('img');
        const imagePromises = Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.onload = img.onerror = () => resolve(void 0);
            });
        });

        await Promise.all(imagePromises);

        // Wait for fonts to load (if using web fonts)
        if (document.fonts) {
            await document.fonts.ready;
        }

        // Minimum loading time to prevent flash
        await new Promise(resolve => setTimeout(resolve, 800));
    }

    onMount(async () => {
        try {
            // Initialize translations
            const storedLang = getStoredLanguage();
            const langFromCookie = data?.lang || storedLang;
            await initTranslations(langFromCookie);

            // Wait for all resources to load
            await waitForResources();
        } catch (error) {
            console.error('Loading error:', error);
        } finally {
            isLoading = false;
        }
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