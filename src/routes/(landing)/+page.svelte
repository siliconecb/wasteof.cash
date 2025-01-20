<script>
	// @ts-nocheck
	import Cursor from '$lib/components/home/Cursor.svelte';
	import Bg from '$lib/components/home/Bg.svelte';
	import Hero from '$lib/components/home/Hero.svelte'

	let cX = 0;
	let cY = 0;

	function bgmask(event) {
		cX = event.detail.x;
		cY = event.detail.y;
	}
</script>

<main>
	<Bg {cX} {cY} />
	<div class="h-screen w-full bg-gradient-to-b relative">
		<div class="absolute z-[9999] mix-blend-exclusion"><Cursor on:cursorMove={bgmask} /></div>
		<div
			class="absolute top-[36px] left-[61px] w-[160px] h-[54px] bg-[#1C1C1C] bg-opacity-40 rounded-[12px] flex items-center justify-center"
		>
			<span
				class="font-['sora'] text-white font-[550] text-center text-[18px] select-none pointer-events-auto"
				>wasteof.cash</span
			>
		</div>
		<div
			class="absolute top-[36px] right-[61px] w-[248px] h-[54px] bg-[#1C1C1C] bg-opacity-40 rounded-[12px] flex items-center justify-end"
		>
			<a
				href="/login"
				rel="external"
				class="w-[80px] h-[42px] bg-transparent hover:bg-[#6A6A6A] hover:bg-opacity-40 rounded-[10px] mr-[6px] flex items-center justify-center transition-all duration-300 ease-in-out"
			>
				<span class="font-['chivo'] text-white text-[10.7px] select-none pointer-events-auto"
					>log in</span
				>
			</a>
			<a
				href="/"
				class="w-[150px] h-[42px] bg-white hover:bg-[#1C1C1C] hover:bg-opacity-25 rounded-[10px] mr-[6px] flex items-center justify-center group transition-all duration-300 ease-in-out relative"
			>
				<span
					class="font-['chivo'] text-black group-hover:text-white text-[10.7px] transition-colors duration-300 ease-in-out select-none pointer-events-auto"
					>request early access</span
				>
				<div
					class="absolute inset-[0.5px] border-[1px] border-transparent group-hover:border-white rounded-[8px] pointer-events-none transition-colors duration-300 ease-in-out"
				></div>
			</a>
		</div>

		<Hero />

		<div
			class="absolute bottom-[50px] right-[60px] text-[#676767] text-[14px] font-['sora'] font-[600] text-center selection:bg-[#999999]"
		>
			wasteof.cash is a sprited and cutting edge alternative<br /> client for wasteof.money with
			<span
				class="inline-flex animate-text-gradient bg-gradient-to-r from-[#676767] via-[#ACACAC] to-[#676767] bg-[200%_auto] text-[14px] text-transparent font-[800] bg-clip-text"
			>
				superpowers.
			</span>

			<br />
			<br />
			<!-- errplane easter egg (don't forget to revert later)-->
			<div class="group">
				<span class="text-[#606060] group-hover:hidden">"wasteof on roids" - @errplane</span>
				<span class="text-[#606060] hidden group-hover:inline"
					>"I would have sex with wasteof.cash even though i'm legally married to @flex" - @errplane</span
				>
			</div>
		</div>
	</div>
</main>

<style></style>
