<script>
  import Stars from "$lib/components/home/Particles.svelte";
</script>

<div class="stars-cont tmain">
  <slot></slot>
  <Stars />
</div>

<style>
  .stars-cont {
    position: relative;
    min-height: 100vh;
  }
</style>

