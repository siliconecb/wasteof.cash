<script>
  // @ts-nocheck

  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { goto } from '$app/navigation';

  $: where = $page.url.pathname;

  const isactive = (path) => where.startsWith(path);

  let mouseover = null;
  let mousedown = null;

  function mouseEnter(path) {
    mouseover = path;
  }

  function mouseleave() {
    mouseover = null;
  }

  function pressmouse(event, path) {
    mousedown = path;
    const target = event.currentTarget;
    gsap.to(target, {
      scale: 0.96, 
      duration: 0.08, 
      ease: "power1.in"
    });
  }

  function letgomouse(event, path) {
    if (mousedown === path) {
      const target = event.currentTarget;
      gsap.to(target, {
        scale: 1.00, 
        duration: 0.25, 
        ease: "power1.out",
        onComplete: () => {
          gsap.to(target, {
            scale: 1,
            duration: 0.15, 
            ease: "power1.inOut"
          });
        }
      });
      goto(path);
    }
    mousedown = null;
  }

  onMount(() => {
    gsap.set('.nav-item', { transformOrigin: 'center' });
  });
</script>

<div class="flex flex-col space-y-3 text-lg pl-2">
  {#each [
    { path: '/feed', icon: 'bx-home-alt', text: 'feed' },
    { path: '/explore', icon: 'bx-search', text: 'explore' },
    { path: '/bookmarks', icon: 'bx-bookmark', text: 'bookmarks' },
    { path: '/messages', icon: 'bx-message', text: 'messages' }
  ] as { path, icon, text }}
    <a 
      href={path} 
      class="nav-item flex items-center space-x-3"
      class:active={isactive(path)}
      class:hovered={mouseover === path}
      on:mouseenter={() => mouseEnter(path)}
      on:mouseleave={mouseleave}
      on:mousedown={(e) => pressmouse(e, path)}
      on:mouseup={(e) => letgomouse(e, path)}
      on:mouseleave={() => mousedown = null}
    >
      <i class={`bx ${icon} nav-icon`}></i>
      <span style="font-family: '__nohemi_164e0f'; font-size: 16px;">
        {text}
      </span>
    </a>
  {/each}
</div>

<style>
  .nav-item {
    color: #ffffff;
    transition: color 0.3s ease;
    user-select: none;
  }

  .nav-item.active {
    color: #7BB0FF;
  }

  .nav-item:hover:not(.active) {
    color: #bdbdbd;
  }

  .nav-item.active:hover {
    color: #7BB0FF;
  }

  .nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }

  .bx-home-alt {
    transform: translateY(-2.4px);
  }

  .bx-search {
    transform: translateY(0px);
  }

  .bx-bookmark {
    transform: translateY(-1px);
  }

  .bx-message {
    transform: translateY(0px);
  }
</style>