<script>
  // @ts-nocheck

  import { page } from "$app/stores";

  // error code parsing (for later)
  function formatErrorMessage(message) {
    if (!message) return "UNKNOWN_ERROR";
    return message.toUpperCase().replace(/\s+/g, "_");
  }
</script>

<!-- {$page.status} do not remove, this is how to call status code so i don't forget lol-->

<sveltekit:head>
  <title>{$page.status} | wasteof.cash</title>
  <meta name="og:title" content="wasteof.cash - {$page.status}" />
  <meta name="title" content="wasteof.cash - {$page.status}" />
  <meta
    name="og:description"
    content="wasteof.cash - a supercharged alternative client for wasteof.money"
  />
  <meta
    name="description"
    content="wasteof.cash - a supercharged alternative client for wasteof.money"
  />
</sveltekit:head>

<div class="absolute pt-6 px-6">
  <a href="/">
    <img
      src="/brand/nav-logo-bright.svg"
      alt="wasteof.cash logo"
      width="60"
      height="30"
      class="rounded"
      style="border-radius: 6px"
    />
  </a>
</div>
<main class="flex items-center justify-center h-screen">
  {#if $page.status === 404}
    <img src="/img/misc/404.png" alt="404 Not Found" class="fourohfour" />
  {/if}
</main>

<!-- tailwind no worky for scaling so normal css it is-->
<style>
  .fourohfour {
    width: 40%;
    height: auto;
  }
</style>
