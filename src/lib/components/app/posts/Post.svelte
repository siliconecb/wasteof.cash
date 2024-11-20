<script>
  // @ts-nocheck
  import * as Avatar from "$lib/components/ui/avatar";
  import { Skeleton } from "$lib/components/ui/skeleton/index.js";
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
</script>

<div
  class="box shadow-[0_0_0_1.5px_rgba(29,29,29,1)] rounded-[21px] min-h-[130px] w-[520px] bg-[#27292C] relative p-4 transition-[box-shadow] duration-300 ease-in-out hover:shadow-[0_0_0_0.7px_var(--hover-border-color)]"
  style="--hover-border-color: {hexToRgba(tcolor, 0.5)};"
>
  <div class="flex items-center mb-2">
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
  <div class="text-white break-words pl-2 -mt-1" 
    style="font-family: '__onest_fe105d'; font-size: 14px;" >
    {@html finalcontent}
  </div>
</div>
