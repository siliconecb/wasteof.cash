<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import Navbar from "$lib/components/app/Navbar.svelte";
  import * as Avatar from "$lib/components/ui/avatar";
  import { Skeleton } from "$lib/components/ui/skeleton/index.js";

  let username = "";
  let avatarUrl = "";

  async function isrealtoken() {
    if (!browser) return;

    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      try {
        const response = await fetch("https://api.wasteof.money/session", {
          headers: {
            Authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          username = data.user.name;
          avatarUrl = `https://api.wasteof.me/users/${username}/picture`;
        } else {
          invalidtokensignout();
        }
      } catch (error) {
        console.error(
          "you have an invalid token or there was an error fetching:",
          error
        );
        invalidtokensignout();
      }
    }
  }

  function invalidtokensignout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    if (browser) {
      window.location.reload();
    }
  }

  onMount(() => {
    isrealtoken();
  });
</script>

<div class="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
  <div
    class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 w-full max-w-[3840px] h-[10vw] max-h-[400px] min-h-[200px] bg-[url('/styling/glow.png')] bg-cover bg-no-repeat bg-top"
    role="presentation"
    aria-hidden="true"
    on:contextmenu|preventDefault
  ></div>
  <slot /> <!-- actual page content, do not remove -->
</div>

<div class="bg-[#1F2124] min-h-screen flex">
  <nav
    class="w-64 pt-8 px-6 flex flex-col justify-start items-start relative z-10"
  >
    <a
      href="/"
      class="flex items-center relative z-10 mb-8"
      data-sveltekit-preload-data="off"
    >
      <img
        src="/brand/nav-logo-bright.svg"
        alt="wasteof.cash logo"
        width="60"
        height="30"
        class="rounded-md"
      />
    </a>
    <Navbar />
  </nav>

  <div class="absolute top-8 right-14 z-10">
    <Avatar.Root class="w-9 h-9">
      {#if avatarUrl}
        <Avatar.Image src={avatarUrl} alt={`@${username}`} />
      {:else}
        <Avatar.Fallback>
          <Skeleton class="h-8 w-8 rounded-full bg-gray-500 dark:bg-gray-700" />
        </Avatar.Fallback>
      {/if}
    </Avatar.Root>
  </div>
</div>

<style>
  @font-face {
    font-family: "__nohemi_164e0f";
    src: url("/static/media/_164e0f7e37680def92131715a86af08c.ttf");
  }
</style>
