<script>
	// @ts-nocheck
	import { onMount, createEventDispatcher } from 'svelte';
	import { gsap } from 'gsap';

	const dispatch = createEventDispatcher();

	let cursor;
	let circle;

	const mouse = { x: -100, y: -100 }; // starting coords
	const pos = { x: 0, y: 0 };
	const speed = 0.1; // speed 0-1

	onMount(() => {
		cursor = document.querySelector('#cursor');
		circle = cursor.querySelector('.cursor__circle');

		const coords = (e) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};

		window.addEventListener('mousemove', coords);

		const movedot = () => {
			const diffX = mouse.x - pos.x;
			const diffY = mouse.y - pos.y;

			pos.x += diffX * speed;
			pos.y += diffY * speed;

			const angle = Math.atan2(diffY, diffX) * (180 / Math.PI);
			const distance = Math.sqrt(diffX ** 2 + diffY ** 2);
			const maxSqueeze = 0.15;
			const accelerator = 1500;
			const squeeze = Math.min(distance / accelerator, maxSqueeze);

			const scale = `scale(${1 + squeeze}, ${1 - squeeze})`;
			const rotate = `rotate(${angle}deg)`;

			gsap.to(cursor, {
				x: pos.x - 11,
				y: pos.y - 9,
				duration: 0.5,
				ease: 'power2.out',
				onUpdate: () => {
					const rect = cursor.getBoundingClientRect();
					dispatch('cursorMove', { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
				}
			});

			gsap.to(circle, {
				transform: `${rotate} ${scale}`,
				duration: 0.5,
				ease: 'power2.out'
			});

			requestAnimationFrame(movedot);
		};

		requestAnimationFrame(movedot);

		return () => {
			window.removeEventListener('mousemove', coords);
		};
	});
</script>

<div id="cursor" class="fixed pointer-events-none">
	<div class="cursor__circle w-[14px] h-[14px] rounded-full bg-[#c8c8c8] opacity-70"></div>
</div>

<style>
	#cursor {
		transform-origin: center;
		z-index: 9999;
	}
</style>
