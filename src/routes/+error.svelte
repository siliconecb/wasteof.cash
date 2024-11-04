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
<div style="background: linear-gradient(180deg, #659be1 0%, #dccfc5 100%)">
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
    <img src="/img/misc/{$page.status}.png" alt="{formatErrorMessage($page.error?.message)}" class="status" on:contextmenu|preventDefault/>
  </main>
</div>

<!-- tailwind no worky for scaling so normal css it is-->
<style>
  .status {
    width: 30%;
    height: auto;
  }
</style>

