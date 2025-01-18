<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';

    let line1;
    let line2;
    let boldly;

    // inspired from v1 of the site
    // fun fact: my dumbass introduced a weird bug on line 2, but it looks cool so it's staying
    onMount(() => {
        const tl = gsap.timeline();

        tl.from(line1, {
            duration: 0.8,
            y: 30,
            opacity: 0,
            filter: 'blur(5px)',
            ease: 'power2.out'
        })
        .from(line2, {
            duration: 0.8,
            y: 20,
            opacity: 0,
            filter: 'blur(5px)',
            ease: 'power2.out'
        }, "-=0.5")
        .from(boldly, {
            duration: 0.8,
            y: 20,
            opacity: 0,
            filter: 'blur(5px)',
            ease: 'power2.out'
        }, "-=0.5");
    });
</script>

<div
    class="pointer-events-auto absolute bottom-[50px] left-[60px] text-[64px] leading-tight font-['geist'] text-white font-[600] select-none"
>
    <div bind:this={line1}>
        connect and<br />
    </div>
    <div>
        <span bind:this={line2} class="text-white">share</span> 
        <span
            bind:this={boldly}
            class="relative bg-clip-text text-transparent bg-gradient-to-b from-[#FFFFFF] from-0% to-[#CDC2B0] to-80%"
        >
            boldly.
        </span>
    </div>
</div>

<style></style>
