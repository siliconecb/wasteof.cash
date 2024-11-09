<script>
  // @ts-nocheck

  import "../app.css";
  import { beforeNavigate } from "$app/navigation";
  import { gsap } from "gsap";
  import { browser } from "$app/environment";

  // incase i need to revert
  //let cbg = "linear-gradient(180deg, #548cd6 24%, #e3c7b1 100%)";

  let cbg;
  if (browser) {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/about"
    ) {
      cbg = "linear-gradient(180deg, #659be1 0%, #dccfc5 100%)";
    } else if (window.location.pathname === "/") {
      cbg = "linear-gradient(180deg, #548cd6 24%, #e3c7b1 100%)";
    }
  }

  beforeNavigate(({ to }) => {
    let bgNew;

    if (to?.url.pathname === "/login" || to?.url.pathname === "/about") {
      bgNew = "linear-gradient(180deg, #659be1 0%, #dccfc5 100%)";
    } else if (to?.url.pathname === "/") {
      bgNew = "linear-gradient(180deg, #548cd6 24%, #e3c7b1 100%)";
    }

    const appc = document.querySelector(".app");

    const existingBg = appc.querySelector(".new-bg");
    if (existingBg) {
      appc.removeChild(existingBg);
    }

    const uhh = document.createElement("div");
    Object.assign(uhh.style, {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      background: bgNew,
      opacity: "0",
      pointerEvents: "none",
      zIndex: "-998"
    });
    uhh.className = "new-bg";
    appc.appendChild(uhh);

    gsap.to(uhh, {
      duration: 0.5,
      opacity: 1,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(appc, {
          duration: 0.5,
          background: cbg,
          onComplete: () => {
            const oldBgs = appc.getElementsByClassName("new-bg");
            while (oldBgs.length > 1) {
              appc.removeChild(oldBgs[0]);
            }
            cbg = bgNew;
          },
        });
      },
    });
  });
</script>

<div
  class="app"
  style="background: {cbg}; position: relative; overflow: hidden;"
>
  <slot />
</div>

<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  .app {
    position: relative;
    min-height: 100vh;
    z-index: 1;
  }

  :global(::selection) {
    background-color: #a1cbef64;
  }
</style>
