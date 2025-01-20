<script>
    import { onMount } from 'svelte';
    import Loader from '$lib/components/login/Loader.svelte'

    let relay = true;

    onMount(() => {
        const timer = setTimeout(() => {
            relay = false;
        }, 1000);

        return () => clearTimeout(timer);
    });
</script>

<main class="bg relative min-h-screen">
    {#if relay}
        <div class="fixed inset-0 bg2 z-50 flex items-center justify-center">
            <Loader />
        </div>
    {/if}
    
    <slot />
</main>

<style>
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, #434343, #727272);
		z-index: -1;
	}
    .bg2 {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, #2B2B2B, #555555);
	}
</style>