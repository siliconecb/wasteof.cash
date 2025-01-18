<div class="container"></div>

<style>
  .container {
    --uib-size: 45px;
    --uib-color: rgb(255, 255, 255);
    --uib-speed: .9s;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: calc(var(--uib-size) * 0.25);
    width: var(--uib-size);
  }

  .container::before {
    content: '';
    height: calc(var(--uib-size) * 0.25);
    width: 25%;
    border-radius: 50%;
    animation: wobble var(--uib-speed) calc(var(--uib-speed) * -0.1) ease-in-out
      infinite;
    transform: translate(0, calc(var(--uib-size) * -0.4));
    background-color: var(--uib-color);
    transition: background-color 0.3s ease;
  }

  @keyframes wobble {
    0%,
    100% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(calc(var(--uib-size) * 0.4));
    }
  }
</style>
