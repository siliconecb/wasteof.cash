<script>
	import Particles from '$lib/components/app/Particles.svelte';
</script>

<main class="app">
    <slot />
	<div
		class="absolute flex h-full w-full flex-col items-center overflow-hidden justify-center select-none pointer-events-none"
	>
		<Particles className="absolute inset-0" refresh={true} />
	</div>
</main>

<style>
    .app {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: -1;
        background-color: #151515;
    }
</style>