<script>
  // @ts-nocheck
  import * as Avatar from "$lib/components/ui/avatar";
  import { Skeleton } from "$lib/components/ui/skeleton/index.js";
  import NumberFlow from "@number-flow/svelte";
  import { onMount } from "svelte";
  import { gsap } from "gsap";

  import {
    gettime,
    unescape,
    realcontentstuff,
    timetooltip,
    tmapcolor,
    hexToRgba,
  } from "$lib/utils/postUtils.js";

  // exports for component
  export let username;
  export let time;
  export let content;

  // color
  export let color;
  let tcolor = tmapcolor(color);

  // post content stuff
  let unescaped = unescape(content);
  let finalcontent = realcontentstuff(unescaped, tcolor);

  // timestamp converter stuff
  let timestamp = gettime(time);
  let ttooltip = timetooltip(time);
  $: avatarUrl = `https://api.wasteof.me/users/${username}/picture`;

  // ====================================
  // post like animation

  let isLiked = false;
  let lHover = false;
  let likeCount = 0;

  function toggleLike(event) {
    const target = event.currentTarget;

    if (!isLiked) {
      isLiked = true;
      likeCount += 1;
      gsap.to(target, {
        scale: 0.9,
        duration: 0.1,
        ease: "power1.in",
        onComplete: () => {
          gsap.to(target, {
            scale: 1.1,
            duration: 0.2,
            ease: "power1.out",
            onComplete: () => {
              gsap.to(target, {
                scale: 1,
                duration: 1,
                ease: "elastic.out(1, 0.3)",
              });
            },
          });
        },
      });
    } else {
      isLiked = false;
      likeCount -= 1;
      // no animation
    }
  }
</script>

<div
  class="box shadow-[0_0_0_1.5px_rgba(29,29,29,1)] rounded-[21px] min-h-[130px] w-[520px] bg-[#27292C] relative p-4 transition-[box-shadow] duration-300 ease-in-out hover:shadow-[0_0_0_0.7px_var(--hover-border-color)]"
  style="--hover-border-color: {hexToRgba(tcolor, 0.5)};"
>
  <div class="flex items-center mb-[12px]">
    <Avatar.Root class="w-8 h-8">
      <Avatar.Image src={avatarUrl} alt={`@${username}`} />
      <Avatar.Fallback>
        <Skeleton class="h-8 w-8 rounded-full bg-gray-500 dark:bg-gray-700" />
      </Avatar.Fallback>
    </Avatar.Root>
    <div class="flex items-center ml-2">
      <a href="/users/@{username}">
        <span
          class="text-[#D1D1D1]"
          style="font-family: '__nohemi_164e0f'; font-size: 14px;"
        >
          @{username}
        </span>
      </a>
      <span
        class="ml-2 text-[#828282] flex items-center text-[10px] leading-[10px] pt-[5px]"
        style="font-family: '__nohemi_164e0f';"
        title={ttooltip}
      >
        {timestamp}
      </span>
    </div>
  </div>
  <div
    class="text-white break-words pl-2 -mt-1"
    style="font-family: '__onest_fe105d'; font-size: 14px;"
  >
    {@html finalcontent}
  </div>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="mt-5 pl-2 flex items-center space-x-6">
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <div class="flex items-center space-x-[6px]">
      <button class="cursor-pointer" on:click={toggleLike}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={isLiked ? "#EA7F7F" : "none"}
          stroke={isLiked ? "#EA7F7F" : "#DADADA"}
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icn-heart cursor-pointer"
          on:mouseenter={() => {
            if (!isLiked) {
              lHover = true;
              gsap.to(event.currentTarget, {
                stroke: "#EA7F7F",
                duration: 0.2,
              });
            }
          }}
          on:mouseleave={() => {
            if (!isLiked) {
              lHover = false;
              gsap.to(event.currentTarget, {
                stroke: "#DADADA",
                duration: 0.2,
              });
            }
          }}
        >
          <path
            d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
          />
        </svg>
      </button>

      <NumberFlow
        value={likeCount}
        style={`font-family: '__nohemi_164e0f'; font-size: 14px; color: ${isLiked || lHover ? "#EA7F7F" : "#DADADA"};`}
        class="like-count transition-colors duration-200"
      />
    </div>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#DADADA"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icn-repost"
    >
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#DADADA"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icn-comment"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M13 8H7" />
      <path d="M17 12H7" />
    </svg>
  </div>
</div>
