<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { authenticate } from '$lib/util/auth';

	let loading = true;
	let loadingContainer;

	let swoosh;
	let outline;
	let bg;
	let usrinput = '';
	let pswrdinput = '';
	let step1 = false;
	let input1;
	let input2;
	let step2;

	let err = '';

	onMount(() => {
		setTimeout(() => {
			gsap.fromTo(
				swoosh,
				{ backdropFilter: 'blur(0px)' },
				{
					backdropFilter: 'blur(6px)',
					duration: 1.5,
					ease: 'power2.inOut'
				}
			);

			gsap.fromTo(
				outline,
				{ filter: 'blur(3px)' },
				{
					filter: 'blur(0px)',
					duration: 1.2,
					ease: 'power2.inOut'
				}
			);
		}, 1000);
	});

	async function nextstep(event) {
		if (event.key === 'Enter' && usrinput.trim() !== '' && !step1) {
			step1 = true;
			grow();
		} else if (event.key === 'Enter' && step1 && pswrdinput.trim() !== '') {
			try {
				const result = await authenticate(usrinput, pswrdinput);

				if (result.error) {
					err = result.error;
				}
			} catch (error) {
				err = 'auth failure';
				console.error(error);
			}
		}
	}

	function submit(event) {
		pswrdinput = event.target.value;
	}

	function grow() {
		gsap.to([outline, bg], {
			height: 250,
			duration: 0.6,
			ease: 'elastic.out(1, 0.75)'
		});
		gsap.fromTo(
			input1,
			{ opacity: 0, y: -20 },
			{
				opacity: 1,
				y: 0,
				duration: 0.6,
				ease: 'power2.out',
				onComplete: () => {
					step2.focus();
				}
			}
		);
		input2.blur();
	}

	function shrink() {
		const tl = gsap.timeline({
			onComplete: fieldclear
		});

		tl.to(input1, {
			opacity: 0,
			y: -20,
			duration: 0.4,
			ease: 'power2.in'
		}).to(
			[outline, bg],
			{
				height: 210,
				duration: 0.6,
				ease: 'elastic.out(1, 0.75)'
			},
			'<'
		);

		input2.focus();
	}

	function fieldclear() {
		if (step2) {
			step2.value = '';
		}
		pswrdinput = '';
	}

	$: if (usrinput.trim() === '' && step1) {
		step1 = false;
		shrink();
	}
</script>

<main>
	<div
		class="h-screen bg-cover bg-center"
		style="background-image: url('/static/media/f/wswoosh.svg');"
	>
		<div class="flex items-center justify-center h-full relative">
			<div bind:this={bg} class="absolute z-10 w-[380px] h-[210px] rounded-[50px] overflow-hidden">
				<div class="bg-[#1C1C1C] opacity-20 w-full h-full"></div>
			</div>
			<div
				bind:this={outline}
				class="absolute z-20 w-[380px] h-[210px] outline outline-[30px] rounded-[50px] outline-[#0000000f] flex flex-col items-center justify-start pt-5"
			>
				<img
					src="/static/media/f/wombat.png"
					alt="wombat"
					class="w-14 select-none pointer-events-auto"
				/>
				<p
					class="text-white text-[16px] font-[600] font-['sora'] mt-1 select-none pointer-events-auto"
				>
					log in to wasteof.cash
				</p>
				<div class="relative mt-7">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="#A9A9A9"
						class="w-[18px] absolute left-3 top-1/2 transform -translate-y-1/2"
					>
						<path
							fill-rule="evenodd"
							d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
							clip-rule="evenodd"
						/>
					</svg>
					<input
						bind:this={input2}
						type="text"
						placeholder="username"
						bind:value={usrinput}
						on:keydown={nextstep}
						class="w-[230px] h-[36px] bg-[#040404] bg-opacity-[0.08] rounded-[10px] pl-[40px] text-[#C6C6C6] placeholder-[#717171] font-['sora'] font-[600] text-[13px] focus:outline-none"
					/>
				</div>
				<div bind:this={input1} class="relative mt-[10px] opacity-0">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="#A9A9A9"
						class="w-[18px] absolute left-3 top-1/2 transform -translate-y-1/2"
					>
						<path
							fill-rule="evenodd"
							d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
							clip-rule="evenodd"
						/>
					</svg>
					<input
						bind:this={step2}
						type="password"
						placeholder="password"
						on:input={submit}
						on:keydown={nextstep}
						class="w-[230px] h-[36px] bg-[#040404] bg-opacity-[0.08] rounded-[10px] pl-[40px] text-[#C6C6C6] placeholder-[#717171] font-['sora'] font-[600] text-[13px] focus:outline-none"
					/>
				</div>
				{#if err}
					<p class="text-red-500 mt-2 font-['chivo'] text-[10px]">{err}</p>
				{/if}
			</div>
			<div bind:this={swoosh} class="absolute z-0 w-[380px] h-[210px] rounded-[50px]"></div>
		</div>
	</div>
</main>
