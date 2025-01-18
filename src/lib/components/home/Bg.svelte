<script>
	import Noise from "./Noise.svelte";

	export let cX = 0;
	export let cY = 0;
</script>

<div class="bg" style="--mask-x: {cX}px; --mask-y: {cY}px;">
    <Noise />
</div>

<style>
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to bottom, #5c5c5c, #878787);
		z-index: -1;
		mask-image: radial-gradient(
			circle 7px at var(--mask-x) var(--mask-y),
			transparent 100%,
			black 100%
		);
		-webkit-mask-image: radial-gradient(
			circle 7px at var(--mask-x) var(--mask-y),
			transparent 100%,
			black 100%
		);
	}
</style>
