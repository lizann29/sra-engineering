<script lang="ts">
    interface Props {
        children?: import('svelte').Snippet;
    }

    let { children }: Props = $props();

</script>

<div class="page-container">
    {@render children?.()}
</div>


<style lang="scss">
  .page-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-none, 0rem);
    flex: 1 0 0;
    max-width: 100%;
    overflow: auto;
  }

  @media (max-width: 768px) {
    .page-container {
      overflow-x: auto;
    }
  }
</style>
