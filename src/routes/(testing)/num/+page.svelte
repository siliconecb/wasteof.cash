<script>
  import NumberFlow from "@number-flow/svelte";

  let counter = 0;

  function increaseCounter() {
    const randomAmount = Math.floor(Math.random() * 4) + 7;
    counter += randomAmount;
  }
</script>

<div class="centered-container">
<NumberFlow value={counter} style={`font-family: '__nohemi_164e0f'; font-size: 64px;`} />

<div class="button-container" style="margin-top: 10px;">
  <button on:click={increaseCounter} class="styled-button">
  increase (random 7-11)
</button>
</div>
</div>

<style>
  @font-face {
    font-family: "__nohemi_164e0f";
    src: url("/static/media/_164e0f7e37680def92131715a86af08c.ttf");
  }

  .centered-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .styled-button {
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    background-color: #666;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }

  .styled-button:hover {
    background-color: #555;
  }

  .styled-button:active {
    background-color: #444;
    transform: translateY(2px);
  }
</style>