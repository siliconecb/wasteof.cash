<!-- wtf it didn't even work -->
 
<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let container;
  let activeplz = true;
  let particles = [];
  let last = 0;
  const interval = 100;
  let cparticles = 0;
  const initial = 20;

  onMount(() => {
    const Hviewport = window.innerHeight;
    const Wviewport = window.innerWidth;
    const end = Hviewport * 0.4;

    function spawn(time) {
      if (!activeplz) return;

      if (time - last >= interval) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        container.appendChild(particle);

        const startY = Hviewport + 10;
        const duration1 = Math.random() * 10 + 15;
        const duration =
          cparticles < initial
            ? duration1 * 0.5
            : duration1;

        const tween = gsap.fromTo(
          particle,
          {
            x: Math.random() * Wviewport,
            y: startY,
            opacity: Math.random() * 0.4 + 0.1,
          },
          {
            y: end,
            opacity: 0,
            duration: duration,
            ease: "none",
            onComplete: () => {
              particle.remove();
              particles = particles.filter((p) => p.particle !== particle);
            },
          }
        );

        particles.push({ particle, tween, startY, duration });
        last = time;
        cparticles++;
      }

      requestAnimationFrame(spawn);
    }

    requestAnimationFrame(spawn);

    document.addEventListener("amihereorno", () => {
      if (document.hidden) {
        activeplz = false;
        particles.forEach((p) => p.tween.pause());
      } else {
        activeplz = true;
        const currentTime = performance.now();
        particles.forEach((p) => {
          const elapsed = p.tween.time();
          const p2 = elapsed / p.duration;
          const currentY = p.startY + (end - p.startY) * p2;

          gsap.set(p.particle, { y: currentY });
          p.tween.resume();
        });
        last = currentTime - interval;
        cparticles = 0;
      }
    });

    return () => {
      activeplz = false;
    };
  });
</script>

<div bind:this={container} class="container"></div>

<style>
  .container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }

  :global(.particle) {
    position: absolute;
    width: 3px;
    height: 3px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
  }
</style>