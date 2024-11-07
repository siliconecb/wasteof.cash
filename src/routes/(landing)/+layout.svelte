<script>
  import Stars from "$lib/components/siliconecb/Particles.svelte";
</script>

<div class="stars-cont">
  <slot></slot>
  <Stars />
</div>

<style>
  .stars-cont {
    position: relative;
    min-height: 100vh;
  }
</style>
