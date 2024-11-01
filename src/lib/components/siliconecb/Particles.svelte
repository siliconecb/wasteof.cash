<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  let particlesContainer;
  let isActive = true;
  let particles = [];
  let lastParticleTime = 0;
  const particleInterval = 100;
  let particlesCreated = 0;
  const fastParticlesCount = 20;

  onMount(() => {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const endPoint = viewportHeight * 0.4;

    function createParticle(time) {
      if (!isActive) return;

      if (time - lastParticleTime >= particleInterval) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particlesContainer.appendChild(particle);

        const startY = viewportHeight + 10;
        const baseDuration = Math.random() * 10 + 15;
        const duration =
          particlesCreated < fastParticlesCount
            ? baseDuration * 0.5
            : baseDuration;

        const tween = gsap.fromTo(
          particle,
          {
            x: Math.random() * viewportWidth,
            y: startY,
            opacity: Math.random() * 0.4 + 0.1,
          },
          {
            y: endPoint,
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
        lastParticleTime = time;
        particlesCreated++;
      }

      requestAnimationFrame(createParticle);
    }

    requestAnimationFrame(createParticle);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        isActive = false;
        particles.forEach((p) => p.tween.pause());
      } else {
        isActive = true;
        const currentTime = performance.now();
        particles.forEach((p) => {
          const elapsed = p.tween.time();
          const progress = elapsed / p.duration;
          const currentY = p.startY + (endPoint - p.startY) * progress;

          gsap.set(p.particle, { y: currentY });
          p.tween.resume();
        });
        lastParticleTime = currentTime - particleInterval;
        particlesCreated = 0;
      }
    });

    return () => {
      isActive = false;
    };
  });
</script>

<div bind:this={particlesContainer} class="particles-container" />

<style>
  .particles-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
  }

  :global(.particle) {
    position: absolute;
    width: 3px;
    height: 3px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
  }
</style>
