<script lang="ts">
  let drag = $state(0);
  let dragging = $state(false);
  let lastX = 0;

  function grab(event: PointerEvent & { currentTarget: HTMLElement }) {
    dragging = true;
    lastX = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function spin(event: PointerEvent) {
    if (!dragging) return;
    drag += (event.clientX - lastX) * 0.5;
    lastX = event.clientX;
  }

  function release() {
    dragging = false;
  }
</script>

<!--
  A CSS-only 3D model: no WebGL, no images. `.b` is a box built from its faces, `.p` a single
  plane and `.x` a cluster of crossed planes that reads as round from any angle (trees, the
  turbine tower). Night mode tints every face through its ::after and lets the windows glow.
-->
<div
  class={[
    "scene relative h-[340px] w-[320px] touch-pan-y select-none",
    dragging ? "dragging cursor-grabbing" : "cursor-grab"
  ]}
  role="img"
  aria-label="3D model of a solarpunk house on a floating island, with solar panels and a wildflower roof, a greenhouse, a wind turbine, fruit trees, vegetable beds, a beehive and a pond that spills over the edge as a waterfall"
  style:--drag="{drag}deg"
  onpointerdown={grab}
  onpointermove={spin}
  onpointerup={release}
  onpointercancel={release}
>
  <div class="sky">
    <div class="sun"></div>
    <div class="night">
      <div class="moon"></div>
      <div class="shoot"></div>
    </div>
    <div class="cloud"></div>
    <div class="cloud two"></div>
  </div>

  <div class="camera">
    <div class="world">
      <div class="b isle1">
        <div class="front"></div>
        <div class="back"></div>
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
      </div>
      <div class="b isle2">
        <div class="front"></div>
        <div class="back"></div>
        <div class="left"></div>
        <div class="right"></div>
      </div>
      <div class="b isle3">
        <div class="front"></div>
        <div class="back"></div>
        <div class="left"></div>
        <div class="right"></div>
      </div>
      <div class="b isle4">
        <div class="front"></div>
        <div class="back"></div>
        <div class="left"></div>
        <div class="right"></div>
      </div>

      <div class="x roots roots-1">
        <div></div>
        <div></div>
      </div>
      <div class="x roots roots-2">
        <div></div>
        <div></div>
      </div>
      <div class="x roots roots-3">
        <div></div>
        <div></div>
      </div>
      <div class="x roots roots-4">
        <div></div>
        <div></div>
      </div>
      <div class="x roots roots-5">
        <div></div>
        <div></div>
      </div>
      <div class="b rock rock-1">
        <div class="front"></div>
        <div class="back"></div>
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
      </div>
      <div class="b rock rock-2">
        <div class="front"></div>
        <div class="back"></div>
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
      </div>

      <div class="p path"></div>
      <div class="p stream"></div>
      <div class="p pond"></div>
      <div class="p fall"><div></div></div>
      <div class="p lampglow"></div>

      <div class="b house">
        <div class="front">
          <div class="vine top-[6px] left-[2px] h-[62px] w-[10px]"></div>
          <div class="win round top-[5px] left-[17px] size-[22px] rounded-full"></div>
          <div class="win top-[8px] left-[50px] h-[20px] w-[12px] rounded-t-full"></div>
          <div class="win top-[8px] left-[66px] h-[20px] w-[12px] rounded-t-full"></div>
          <div class="door top-[40px] left-[20px] h-[28px] w-[16px] rounded-t-full"></div>
          <div class="win top-[40px] left-[46px] h-[16px] w-[32px]"></div>
          <div class="flowerbox top-[56px] left-[44px] h-[9px] w-[36px]"></div>
        </div>
        <div class="back">
          <div class="win top-[9px] left-[12px] h-[16px] w-[12px]"></div>
          <div class="win top-[9px] left-[37px] h-[16px] w-[12px]"></div>
          <div class="win top-[9px] left-[62px] h-[16px] w-[12px]"></div>
          <div class="win top-[41px] left-[24px] h-[15px] w-[38px]"></div>
          <div class="vine top-[18px] left-[74px] h-[50px] w-[10px]"></div>
        </div>
        <div class="left">
          <div class="win top-[7px] left-[24px] h-[20px] w-[16px] rounded-t-full"></div>
          <div class="win top-[41px] left-[12px] size-[14px]"></div>
        </div>
        <div class="right">
          <div class="win round top-[5px] left-[22px] size-[20px] rounded-full"></div>
          <div class="door top-[42px] left-[25px] h-[26px] w-[14px] rounded-t-full"></div>
        </div>
      </div>

      <div class="p solar">
        <div class="panels"></div>
        <div class="glint"></div>
      </div>
      <div class="p greenroof">
        <div class="win top-[16px] left-[40px] h-[12px] w-[16px]"></div>
      </div>
      <div class="p gable gable-left">
        <div class="win round top-[13px] left-[28px] size-[8px] rounded-full"></div>
      </div>
      <div class="p gable gable-right">
        <div class="win round top-[13px] left-[28px] size-[8px] rounded-full"></div>
      </div>
      <div class="b ridge">
        <div class="front"></div>
        <div class="back"></div>
        <div class="top"></div>
      </div>

      <div class="b greenhouse">
        <div class="front"></div>
        <div class="back"></div>
        <div class="right"></div>
        <div class="top"></div>
      </div>
      <div class="x tomato tomato-1">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="x tomato tomato-2">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="x lemon">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div class="b heatpump">
        <div class="front"></div>
        <div class="back"></div>
        <div class="left"></div>
        <div class="top"></div>
      </div>
      <div class="b tank">
        <div class="front"></div>
        <div class="back"></div>
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
      </div>

      <div class="b bed bed-1">
        <div class="front"></div>
        <div class="back"></div>
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
      </div>
      <div class="b bed bed-2">
        <div class="front"></div>
        <div class="back"></div>
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
      </div>
      <div class="b hive">
        <div class="front"></div>
        <div class="back"></div>
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
      </div>

      <div class="x post">
        <div></div>
        <div></div>
      </div>
      <div class="b lamp">
        <div class="front"></div>
        <div class="back"></div>
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"></div>
      </div>

      <div class="x trunk">
        <div></div>
        <div></div>
      </div>
      <div class="x canopy">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="x cypress cypress-1">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="x cypress cypress-2">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="x bush bush-1">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="x bush bush-2">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div class="x tower">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="b nacelle">
        <div class="front"></div>
        <div class="back"></div>
        <div class="left"></div>
        <div class="right"></div>
        <div class="top"><div class="beacon"></div></div>
      </div>
      <div class="rotor">
        <div class="blade"></div>
        <div class="blade"></div>
        <div class="blade"></div>
        <div class="hub"></div>
      </div>
    </div>
  </div>

  <div class="fireflies">
    <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
  </div>
  <div class="butterflies"><span></span><span></span></div>
</div>

<style>
  .scene {
    --grass: #86c96b;
    --grass-deep: #5fa855;
    --soil: #9a6443;
    --soil-deep: #6f4631;
    --rock: #7b6a63;
    --rock-deep: #4e4541;
    --earth-1: #e2ad7f;
    --earth-2: #d69a6c;
    --earth-3: #eabd92;
    --wood: #e7c393;
    --wood-deep: #caa06c;
    --beam: #8a5a36;
    --frame: #2f6f5e;
    --leaf: #58b567;
    --leaf-hi: #9ad67a;
    --leaf-deep: #2f8650;
    --water-1: #8fdcee;
    --water-2: #3aa6cf;
    --glass: rgba(205, 238, 255, 0.28);
    --glass-frame: #f4f8f3;
    --stone: #d9d1c3;
    --plank: #b98150;
    --plank-deep: #8e5f38;
    --dirt: #5e3c28;
    --white: #f1f4f6;
    --shade: transparent;

    perspective: 1000px;
  }

  :global(.dark) .scene {
    --frame: #1f3b35;
    --glass: rgba(255, 196, 110, 0.3);
    --glass-frame: #9a9884;
    --shade: rgba(16, 22, 62, 0.55);
  }

  /* Sky backdrop */

  .sky {
    position: absolute;
    top: 8px;
    left: 20px;
    width: 280px;
    height: 280px;
    overflow: hidden;
    border-radius: 50%;
    background: linear-gradient(#a9bdf5, #d9c7f0 45%, #f7cddb 70%, #fde5bf);
  }

  .sun {
    position: absolute;
    top: 38px;
    right: 42px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: radial-gradient(circle, #fff4c7, #ffd36b 60%, #ffbe4d);
    box-shadow: 0 0 24px 10px rgba(255, 214, 120, 0.55);
  }

  .night {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.6s;
    background:
      radial-gradient(1px 1px at 20px 30px, #fff, transparent) 0 0 / 97px 83px,
      radial-gradient(1px 1px at 64px 66px, #fff, transparent) 0 0 / 97px 83px,
      radial-gradient(1.5px 1.5px at 40px 12px, #fff, transparent) 0 0 / 131px 113px,
      radial-gradient(1px 1px at 88px 52px, rgba(255, 255, 255, 0.8), transparent) 0 0 / 131px 113px,
      linear-gradient(#0f1533, #221c4a 55%, #3f2a5c);
  }

  :global(.dark) .scene .night {
    opacity: 1;
  }

  .moon {
    position: absolute;
    top: 40px;
    right: 48px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: inset -9px 4px 0 0 #f6efcf;
    filter: drop-shadow(0 0 8px rgba(246, 239, 207, 0.5));
  }

  .shoot {
    display: none;
    position: absolute;
    top: 30px;
    left: 190px;
    width: 40px;
    height: 1.5px;
    opacity: 0;
    rotate: -28deg;
    background: linear-gradient(90deg, #fff, transparent);
    animation: shoot 9s ease-in 3s infinite;
  }

  :global(.dark) .scene .shoot {
    display: block;
  }

  .cloud {
    position: absolute;
    top: 64px;
    left: 0;
    width: 44px;
    height: 12px;
    border-radius: 12px;
    background: #fff;
    box-shadow:
      12px -7px 0 3px #fff,
      26px -2px 0 1px #fff;
    opacity: 0.85;
    animation: drift 70s linear -20s infinite;
  }

  .cloud.two {
    top: 118px;
    scale: 0.7;
    animation-duration: 90s;
    animation-delay: -70s;
  }

  :global(.dark) .scene .cloud {
    opacity: 0.12;
  }

  /* 3D stage */

  .camera {
    position: absolute;
    top: 63%;
    left: 50%;
    transform-style: preserve-3d;
    transform: rotateX(-22deg) rotateY(var(--drag));
    animation: hover 6s ease-in-out infinite alternate;
  }

  .world {
    position: absolute;
    transform-style: preserve-3d;
    rotate: y -32deg;
    animation: turntable 60s linear infinite;
  }

  .scene:hover .world,
  .dragging .world {
    animation-play-state: paused;
  }

  .b,
  .x {
    position: absolute;
    top: 0;
    left: 0;
    transform-style: preserve-3d;
    translate: var(--x) var(--y) var(--z);
  }

  .b > div {
    position: absolute;
    top: calc(var(--h) / -2);
    left: calc(var(--w) / -2);
    width: var(--w);
    height: var(--h);
    backface-visibility: hidden;
  }

  .b > .front {
    --tone: rgba(0, 0, 0, 0.03);
    transform: translateZ(calc(var(--d) / 2));
  }

  .b > .back {
    --tone: rgba(0, 0, 0, 0.2);
    transform: translateZ(calc(var(--d) / -2)) rotateY(180deg);
  }

  .b > .left,
  .b > .right {
    left: calc(var(--d) / -2);
    width: var(--d);
  }

  .b > .left {
    --tone: rgba(0, 0, 0, 0.1);
    transform: translateX(calc(var(--w) / -2)) rotateY(-90deg);
  }

  .b > .right {
    --tone: rgba(0, 0, 0, 0.15);
    transform: translateX(calc(var(--w) / 2)) rotateY(90deg);
  }

  .b > .top {
    top: calc(var(--d) / -2);
    height: var(--d);
    transform: translateY(calc(var(--h) / -2)) rotateX(90deg);
  }

  .p {
    position: absolute;
    top: calc(var(--h) / -2);
    left: calc(var(--w) / -2);
    width: var(--w);
    height: var(--h);
  }

  .x > div {
    position: absolute;
    top: calc(var(--h) * -1);
    left: calc(var(--w) / -2);
    width: var(--w);
    height: var(--h);
  }

  .x > div:nth-child(2) {
    rotate: y 60deg;
  }

  .x > div:nth-child(3) {
    rotate: y 120deg;
  }

  .b > div::after,
  .p::after,
  .x > div::after,
  .blade::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: inherit;
    background: var(--tone, transparent);
    box-shadow: inset 0 0 0 200px var(--shade);
    pointer-events: none;
  }

  /* Floating island */

  .isle1 {
    --x: 0;
    --y: 18px;
    --z: 0;
    --w: 200px;
    --h: 36px;
    --d: 200px;
  }

  .isle2 {
    --x: 0;
    --y: 50px;
    --z: 0;
    --w: 150px;
    --h: 28px;
    --d: 150px;
  }

  .isle3 {
    --x: 0;
    --y: 76px;
    --z: 0;
    --w: 96px;
    --h: 24px;
    --d: 96px;
  }

  .isle4 {
    --x: 0;
    --y: 96px;
    --z: 0;
    --w: 44px;
    --h: 16px;
    --d: 44px;
  }

  .isle1 > .top {
    background:
      radial-gradient(circle at 12px 14px, #ffc2d6 1.6px, transparent 2px) 0 0 / 41px 37px,
      radial-gradient(circle at 30px 6px, #fff3a6 1.5px, transparent 2px) 0 0 / 53px 47px,
      radial-gradient(circle at 20px 30px, #fff 1.3px, transparent 1.8px) 0 0 / 61px 59px,
      radial-gradient(circle at 8px 8px, rgba(40, 110, 50, 0.25) 3px, transparent 4px) 0 0 / 29px
        31px,
      radial-gradient(ellipse at 30% 25%, rgba(255, 255, 255, 0.2), transparent 60%),
      var(--grass);
  }

  .isle1 > div:not(.top) {
    background:
      radial-gradient(ellipse 3px 7px at 6px 5px, var(--grass) 90%, transparent) 0 0 / 23px 100%
        repeat-x,
      radial-gradient(ellipse 5px 3px at 18px 24px, rgba(0, 0, 0, 0.18) 90%, transparent) 0 0 / 47px
        36px,
      linear-gradient(
        var(--grass) 0 5px,
        var(--grass-deep) 5px 7px,
        var(--soil) 7px,
        var(--soil-deep)
      );
  }

  .isle2 > div {
    background:
      radial-gradient(ellipse 6px 3px at 14px 12px, rgba(255, 255, 255, 0.12) 90%, transparent) 0
        0 / 39px 28px,
      linear-gradient(var(--soil-deep), var(--rock));
  }

  .isle3 > div,
  .isle4 > div {
    background:
      radial-gradient(ellipse 5px 3px at 10px 10px, rgba(0, 0, 0, 0.2) 90%, transparent) 0 0 / 31px
        24px,
      linear-gradient(var(--rock), var(--rock-deep));
  }

  .roots > div,
  .vine {
    background:
      radial-gradient(ellipse 3px 2px at 3px 4px, var(--leaf) 90%, transparent) 0 0 / 10px 11px,
      radial-gradient(ellipse 3px 2px at 7px 9px, var(--leaf-hi) 90%, transparent) 0 0 / 10px 11px,
      linear-gradient(var(--leaf-deep) 0 0) 50% 0 / 1px 100% no-repeat;
  }

  .roots > div {
    --w: 10px;
    mask-image: linear-gradient(#000 70%, transparent);
  }

  .roots-1 {
    --x: -86px;
    --y: 70px;
    --z: 97px;
    --h: 34px;
  }

  .roots-2 {
    --x: 44px;
    --y: 60px;
    --z: 97px;
    --h: 24px;
  }

  .roots-3 {
    --x: 97px;
    --y: 76px;
    --z: 30px;
    --h: 40px;
  }

  .roots-4 {
    --x: 97px;
    --y: 58px;
    --z: -62px;
    --h: 22px;
  }

  .roots-5 {
    --x: -97px;
    --y: 64px;
    --z: -20px;
    --h: 28px;
  }

  .rock {
    --w: 16px;
    --h: 12px;
    --d: 16px;
    animation: bob 5s ease-in-out infinite alternate;
  }

  .rock-1 {
    --x: -130px;
    --y: 14px;
    --z: 48px;
  }

  .rock-2 {
    --x: 126px;
    --y: -6px;
    --z: -40px;
    --w: 12px;
    --h: 9px;
    --d: 12px;
    animation-delay: -2.5s;
  }

  .rock > div {
    background: linear-gradient(var(--grass) 0 3px, var(--soil) 3px, var(--rock));
  }

  .rock > .top {
    background: var(--grass);
  }

  .path {
    --w: 22px;
    --h: 70px;
    transform: translate3d(-30px, -0.8px, 62px) rotateX(90deg);
    background:
      radial-gradient(ellipse 6px 4.5px at 35% 6%, var(--stone) 92%, transparent),
      radial-gradient(ellipse 6px 4.5px at 64% 22%, var(--stone) 92%, transparent),
      radial-gradient(ellipse 6px 4.5px at 38% 39%, var(--stone) 92%, transparent),
      radial-gradient(ellipse 6px 4.5px at 62% 56%, var(--stone) 92%, transparent),
      radial-gradient(ellipse 6px 4.5px at 36% 73%, var(--stone) 92%, transparent),
      radial-gradient(ellipse 6px 4.5px at 60% 91%, var(--stone) 92%, transparent);
  }

  .pond {
    --w: 44px;
    --h: 40px;
    transform: translate3d(-66px, -1px, 70px) rotateX(90deg);
    border-radius: 50%;
    box-shadow: inset 0 0 0 3px var(--stone);
    background:
      radial-gradient(circle at 31% 58%, #ff9ec7 1.2px, transparent 1.7px),
      radial-gradient(circle at 30% 60%, #6cbf5a 3.5px, transparent 4px),
      radial-gradient(circle at 64% 36%, #6cbf5a 3px, transparent 3.5px),
      radial-gradient(circle at 55% 70%, #6cbf5a 2.5px, transparent 3px),
      radial-gradient(ellipse at 40% 35%, var(--water-1), var(--water-2));
  }

  .stream {
    --w: 10px;
    --h: 16px;
    transform: translate3d(-66px, -0.8px, 93px) rotateX(90deg);
    background: linear-gradient(var(--water-2), var(--water-1));
  }

  .fall {
    --w: 10px;
    --h: 110px;
    overflow: hidden;
    transform: translate3d(-66px, 55px, 101px);
    mask-image: linear-gradient(#000 50%, transparent);
  }

  .fall > div {
    height: 200%;
    background:
      repeating-linear-gradient(
        90deg,
        transparent 0 2px,
        rgba(255, 255, 255, 0.45) 2px 3px,
        transparent 3px 5px
      ),
      repeating-linear-gradient(rgba(255, 255, 255, 0.55) 0 2px, transparent 2px 9px),
      linear-gradient(var(--water-1), var(--water-2));
    animation: flow 1.1s linear infinite;
  }

  .lampglow {
    --w: 46px;
    --h: 46px;
    transform: translate3d(-12px, -0.6px, 90px) rotateX(90deg);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 200, 110, 0.6), transparent 70%);
    opacity: 0;
  }

  .lampglow::after {
    display: none;
  }

  :global(.dark) .scene .lampglow {
    opacity: 1;
  }

  /* House */

  .house {
    --x: -15px;
    --y: -34px;
    --z: -5px;
    --w: 86px;
    --h: 68px;
    --d: 64px;
  }

  .house > div {
    background:
      linear-gradient(var(--beam) 0 0) 0 33px / 100% 3px no-repeat,
      repeating-linear-gradient(90deg, var(--wood) 0 6px, var(--wood-deep) 6px 7px) 0 0 / 100% 34px
        no-repeat,
      repeating-linear-gradient(
        var(--earth-1) 0 4px,
        var(--earth-2) 4px 7px,
        var(--earth-3) 7px 11px
      );
  }

  .win,
  .door,
  .vine,
  .flowerbox,
  .panels,
  .glint,
  .beacon {
    position: absolute;
  }

  .win {
    z-index: 2;
    border: 1.5px solid var(--frame);
    background: linear-gradient(155deg, #eef9ff 0 30%, #9fd0f0 55%, #c7e6fa);
  }

  .win::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background:
      linear-gradient(var(--frame) 0 0) 50% 0 / 1.5px 100% no-repeat,
      linear-gradient(var(--frame) 0 0) 0 50% / 100% 1.5px no-repeat;
  }

  .win.round::before {
    background:
      radial-gradient(circle, transparent 36%, var(--frame) 38% 46%, transparent 48%),
      linear-gradient(var(--frame) 0 0) 50% 0 / 1.5px 100% no-repeat,
      linear-gradient(var(--frame) 0 0) 0 50% / 100% 1.5px no-repeat;
  }

  :global(.dark) .scene .win {
    background: radial-gradient(circle at 50% 65%, #fff4cf, #ffcb6b 55%, #f29d3a);
    box-shadow: 0 0 8px 2px rgba(255, 186, 92, 0.55);
  }

  .door {
    border: 1.5px solid var(--frame);
    background:
      radial-gradient(circle at 78% 58%, #f5d27a 1.2px, transparent 1.6px),
      linear-gradient(90deg, transparent 48%, rgba(0, 0, 0, 0.15) 48% 52%, transparent 52%),
      linear-gradient(#3aa38b, #26796a);
  }

  .flowerbox {
    background:
      radial-gradient(circle at 3px 3px, #ff7aa2 1.8px, transparent 2.2px) 0 0 / 6px 5px repeat-x,
      radial-gradient(circle at 3px 3px, #ffd65c 1.4px, transparent 1.8px) 3px 1px / 6px 5px
        repeat-x,
      linear-gradient(var(--leaf) 0 0) 0 4px / 100% 2px no-repeat,
      linear-gradient(var(--beam) 0 0) 0 100% / 100% 4px no-repeat;
  }

  /* Roof: solar panels at the front, a wildflower meadow at the back */

  .solar {
    --w: 96px;
    --h: 49px;
    overflow: hidden;
    transform: translate3d(-15px, -79.8px, 13.5px) rotateX(48.8deg);
    box-shadow: inset 0 -2px var(--beam);
    background: #525962;
  }

  .panels {
    inset: 4px 6px 6px;
    border: 1.5px solid #dfe6ee;
    background:
      repeating-linear-gradient(90deg, #dfe6ee 0 1.5px, transparent 1.5px 20.75px) -1.5px 0,
      repeating-linear-gradient(#dfe6ee 0 1.5px, transparent 1.5px 17.5px) 0 -1.5px,
      repeating-linear-gradient(90deg, transparent 0 4.7px, rgba(150, 185, 240, 0.3) 4.7px 5.2px),
      repeating-linear-gradient(transparent 0 4.3px, rgba(150, 185, 240, 0.3) 4.3px 4.8px),
      linear-gradient(160deg, #2d5bb0, #142f66);
  }

  .glint {
    top: -20%;
    left: 0;
    width: 30%;
    height: 140%;
    rotate: 20deg;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
    animation: glint 8s ease-in-out infinite;
  }

  :global(.dark) .scene .glint {
    display: none;
  }

  .greenroof {
    --w: 96px;
    --h: 49px;
    --tone: rgba(0, 0, 0, 0.12);
    transform: translate3d(-15px, -79.8px, -23.5px) rotateY(180deg) rotateX(48.8deg);
    box-shadow: inset 0 -2px var(--beam);
    background:
      radial-gradient(circle at 6px 6px, #ff9ec0 1.6px, transparent 2px) 0 0 / 17px 13px,
      radial-gradient(circle at 12px 10px, #fff3a6 1.4px, transparent 1.9px) 0 0 / 23px 17px,
      radial-gradient(circle at 4px 12px, #c9a6ff 1.4px, transparent 1.9px) 0 0 / 29px 19px,
      repeating-linear-gradient(rgba(0, 0, 0, 0.07) 0 2px, transparent 2px 6px),
      #74b95c;
  }

  .gable {
    --w: 64px;
    --h: 28px;
    clip-path: polygon(50% 0, 100% 100%, 0 100%);
    background: repeating-linear-gradient(90deg, var(--wood) 0 6px, var(--wood-deep) 6px 7px);
  }

  .gable-left {
    --tone: rgba(0, 0, 0, 0.1);
    transform: translate3d(-58px, -82px, -5px) rotateY(-90deg);
  }

  .gable-right {
    --tone: rgba(0, 0, 0, 0.15);
    transform: translate3d(28px, -82px, -5px) rotateY(90deg);
  }

  .ridge {
    --x: -15px;
    --y: -97px;
    --z: -5px;
    --w: 98px;
    --h: 3px;
    --d: 4px;
  }

  .ridge > div {
    background: var(--beam);
  }

  /* Greenhouse */

  .greenhouse {
    --x: 47px;
    --y: -20px;
    --z: -4px;
    --w: 38px;
    --h: 40px;
    --d: 52px;
  }

  .greenhouse > div {
    backface-visibility: visible;
    border: 1.5px solid var(--glass-frame);
    background:
      linear-gradient(130deg, rgba(255, 255, 255, 0.45), transparent 35%),
      repeating-linear-gradient(90deg, transparent 0 11px, var(--glass-frame) 11px 12.5px),
      var(--glass);
  }

  .greenhouse > .top {
    background:
      linear-gradient(130deg, rgba(255, 255, 255, 0.45), transparent 35%),
      repeating-linear-gradient(90deg, transparent 0 11px, var(--glass-frame) 11px 12.5px),
      repeating-linear-gradient(transparent 0 12px, var(--glass-frame) 12px 13.5px), var(--glass);
  }

  .greenhouse > div::after {
    display: none;
  }

  .tomato {
    --w: 14px;
    --y: 0;
  }

  .tomato-1 {
    --x: 38px;
    --z: -16px;
    --h: 30px;
  }

  .tomato-2 {
    --x: 56px;
    --z: 4px;
    --h: 26px;
  }

  .tomato > div {
    background:
      radial-gradient(circle at 30% 40%, #e8483b 1.8px, transparent 2.3px),
      radial-gradient(circle at 66% 28%, #e8483b 1.8px, transparent 2.3px),
      radial-gradient(circle at 56% 58%, #f2683a 1.8px, transparent 2.3px),
      linear-gradient(#c8683f 0 0) 50% 100% / 60% 5px no-repeat,
      radial-gradient(ellipse 45% 42% at 50% 42%, var(--leaf) 90%, transparent);
  }

  .lemon {
    --x: 40px;
    --y: 0;
    --z: 12px;
    --w: 12px;
    --h: 22px;
  }

  .lemon > div {
    background:
      radial-gradient(circle at 35% 30%, #ffe45c 1.6px, transparent 2px),
      radial-gradient(circle at 64% 44%, #ffe45c 1.6px, transparent 2px),
      linear-gradient(#c8683f 0 0) 50% 100% / 60% 5px no-repeat,
      linear-gradient(var(--beam) 0 0) 50% 100% / 1.5px 50% no-repeat,
      radial-gradient(circle at 50% 38%, var(--leaf-deep) 38%, transparent 40%);
  }

  /* Garden */

  .heatpump {
    --x: -63px;
    --y: -7px;
    --z: 8px;
    --w: 10px;
    --h: 14px;
    --d: 18px;
  }

  .heatpump > div {
    background: #dfe4e8;
  }

  .heatpump > .left {
    background:
      radial-gradient(circle, #6c7680 0 1.6px, transparent 2px),
      radial-gradient(circle, transparent 5.5px, #dfe4e8 6px),
      repeating-radial-gradient(circle, #8e98a3 0 0.8px, #cfd6dc 0.8px 2px);
  }

  .tank {
    --x: 10px;
    --y: -8px;
    --z: -46px;
    --w: 12px;
    --h: 16px;
    --d: 12px;
  }

  .tank > div {
    background:
      linear-gradient(#4e3a28 0 0) 0 3px / 100% 1.5px no-repeat,
      linear-gradient(#4e3a28 0 0) 0 11px / 100% 1.5px no-repeat,
      repeating-linear-gradient(90deg, #9c6b3f 0 3px, #86582f 3px 4px);
  }

  .tank > .top {
    box-shadow: inset 0 0 0 1.5px #86582f;
    background: radial-gradient(circle at 40% 40%, var(--water-1), var(--water-2));
  }

  .bed {
    --y: -4px;
    --z: 64px;
    --w: 24px;
    --h: 8px;
    --d: 34px;
  }

  .bed-1 {
    --x: 26px;
  }

  .bed-2 {
    --x: 58px;
  }

  .bed > div {
    background: repeating-linear-gradient(var(--plank) 0 3px, var(--plank-deep) 3px 4px);
  }

  .bed-1 > .top {
    box-shadow: inset 0 0 0 2px var(--plank);
    background:
      radial-gradient(circle at 4px 4px, #8ed16f 2px, transparent 2.6px) 0 1px / 7px 8px,
      var(--dirt);
  }

  .bed-2 > .top {
    box-shadow: inset 0 0 0 2px var(--plank);
    background:
      radial-gradient(circle at 5px 5px, #c3ea98 1.4px, #7fbf5a 1.8px 3.4px, transparent 3.9px) 0
        0 / 10px 10px,
      var(--dirt);
  }

  .hive {
    --x: 88px;
    --y: -6px;
    --z: 36px;
    --w: 10px;
    --h: 12px;
    --d: 10px;
  }

  .hive > div {
    background: repeating-linear-gradient(#f6d27a 0 3.5px, #d9a441 3.5px 4.2px);
  }

  .hive > .front {
    background:
      linear-gradient(#3b2a1a 0 0) 50% 90% / 45% 1.5px no-repeat,
      repeating-linear-gradient(#f6d27a 0 3.5px, #d9a441 3.5px 4.2px);
  }

  .hive > .top {
    background: #b9855a;
  }

  .post {
    --x: -12px;
    --y: 0;
    --z: 90px;
    --w: 2px;
    --h: 24px;
  }

  .post > div {
    background: #3b3f45;
  }

  .lamp {
    --x: -12px;
    --y: -27px;
    --z: 90px;
    --w: 5px;
    --h: 6px;
    --d: 5px;
  }

  .lamp > div {
    border: 1px solid #3b3f45;
    background: #fff6dc;
  }

  .lamp > div::after {
    display: none;
  }

  :global(.dark) .scene .lamp > div {
    background: #ffd27a;
    box-shadow: 0 0 6px 2px rgba(255, 200, 110, 0.8);
  }

  /* Trees */

  .trunk {
    --x: 72px;
    --y: 0;
    --z: -68px;
    --w: 7px;
    --h: 34px;
  }

  .trunk > div {
    clip-path: polygon(30% 0, 70% 0, 100% 100%, 0 100%);
    background: linear-gradient(90deg, #6a4529, #8f6340 50%, #6a4529);
  }

  .canopy {
    --x: 72px;
    --y: -24px;
    --z: -68px;
    --w: 54px;
    --h: 52px;
  }

  .canopy > div {
    border-radius: 48% 52% 46% 54% / 52% 46% 54% 48%;
    background:
      radial-gradient(circle at 30% 40%, #ff9d3b 2.2px, transparent 2.8px),
      radial-gradient(circle at 62% 28%, #ff9d3b 2.2px, transparent 2.8px),
      radial-gradient(circle at 72% 60%, #ff8a2b 2.2px, transparent 2.8px),
      radial-gradient(circle at 42% 72%, #ff9d3b 2.2px, transparent 2.8px),
      radial-gradient(circle at 52% 50%, #ffb04d 2.2px, transparent 2.8px),
      radial-gradient(circle at 38% 32%, var(--leaf-hi), var(--leaf) 45%, var(--leaf-deep) 75%);
  }

  .cypress > div {
    border-radius: 50% 50% 45% 45% / 70% 70% 30% 30%;
    background: radial-gradient(ellipse at 40% 30%, #5aa865, #2e7045 70%);
  }

  .cypress-1 {
    --x: -86px;
    --y: 0;
    --z: -26px;
    --w: 18px;
    --h: 60px;
  }

  .cypress-2 {
    --x: -88px;
    --y: 0;
    --z: -4px;
    --w: 14px;
    --h: 44px;
  }

  .bush > div {
    border-radius: 50% 50% 40% 40% / 60% 60% 40% 40%;
    background:
      radial-gradient(circle at 30% 35%, #ff9ec0 1.3px, transparent 1.7px),
      radial-gradient(circle at 65% 30%, #ff9ec0 1.3px, transparent 1.7px),
      radial-gradient(circle at 50% 60%, #fff 1.3px, transparent 1.7px),
      radial-gradient(ellipse at 40% 30%, var(--leaf-hi), var(--leaf-deep) 80%);
  }

  .bush-1 {
    --x: -92px;
    --y: 0;
    --z: 40px;
    --w: 14px;
    --h: 12px;
  }

  .bush-2 {
    --x: 12px;
    --y: 0;
    --z: 34px;
    --w: 12px;
    --h: 10px;
  }

  /* Wind turbine */

  .tower {
    --x: -76px;
    --y: 0;
    --z: -70px;
    --w: 6px;
    --h: 130px;
  }

  .tower > div {
    clip-path: polygon(30% 0, 70% 0, 100% 100%, 0 100%);
    background: linear-gradient(90deg, #cfd6dd, #fbfcfd 50%, #cfd6dd);
  }

  .nacelle {
    --x: -76px;
    --y: -132px;
    --z: -68px;
    --w: 8px;
    --h: 8px;
    --d: 20px;
  }

  .nacelle > div {
    background: var(--white);
  }

  .beacon {
    display: none;
    z-index: 2;
    top: 3px;
    left: 2.5px;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #ff4d4d;
    box-shadow: 0 0 4px 1px #ff4d4d;
    animation: beacon 2s linear infinite;
  }

  :global(.dark) .scene .beacon {
    display: block;
  }

  .rotor {
    position: absolute;
    top: 0;
    left: 0;
    translate: -76px -132px -57px;
    animation: spin 2.6s linear infinite;
  }

  .blade {
    position: absolute;
    top: -44px;
    left: -3.5px;
    width: 7px;
    height: 44px;
    transform-origin: 50% 100%;
    clip-path: polygon(42% 0, 58% 0, 100% 80%, 60% 100%, 20% 92%);
    background: linear-gradient(90deg, #dde3e8, #fff);
  }

  .blade:nth-child(2) {
    rotate: 120deg;
  }

  .blade:nth-child(3) {
    rotate: 240deg;
  }

  .hub {
    position: absolute;
    top: -4px;
    left: -4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #fff, #b9c2ca);
  }

  /* Wildlife: butterflies by day, fireflies by night */

  .fireflies {
    display: none;
  }

  :global(.dark) .scene .fireflies {
    display: block;
  }

  .fireflies span {
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: #fff6a8;
    box-shadow: 0 0 6px 2px rgba(255, 240, 120, 0.7);
    animation:
      float 6s ease-in-out infinite alternate,
      blink 2.2s ease-in-out infinite;
  }

  .fireflies span:nth-child(1) {
    top: 190px;
    left: 58px;
  }

  .fireflies span:nth-child(2) {
    top: 232px;
    left: 92px;
    animation-delay:
      -2s,
      -0.7s;
  }

  .fireflies span:nth-child(3) {
    top: 176px;
    left: 250px;
    animation-delay:
      -4s,
      -1.4s;
  }

  .fireflies span:nth-child(4) {
    top: 250px;
    left: 226px;
    animation-delay:
      -1s,
      -0.3s;
  }

  .fireflies span:nth-child(5) {
    top: 140px;
    left: 40px;
    animation-delay:
      -3s,
      -1.9s;
  }

  .fireflies span:nth-child(6) {
    top: 210px;
    left: 270px;
    animation-delay:
      -5s,
      -1.1s;
  }

  .fireflies span:nth-child(7) {
    top: 280px;
    left: 150px;
    animation-delay:
      -2.5s,
      -0.5s;
  }

  :global(.dark) .scene .butterflies {
    display: none;
  }

  .butterflies span {
    position: absolute;
    top: 200px;
    left: 216px;
    width: 8px;
    height: 6px;
    animation: flutter 11s ease-in-out infinite;
  }

  .butterflies span:nth-child(2) {
    top: 170px;
    left: 70px;
    animation-duration: 13s;
    animation-direction: reverse;
  }

  .butterflies span::before,
  .butterflies span::after {
    content: "";
    position: absolute;
    top: 0;
    width: 4px;
    height: 6px;
    border-radius: 50% 50% 40% 40%;
    background: #ff8fb8;
    animation: flap 0.22s ease-in-out infinite alternate;
  }

  .butterflies span:nth-child(2)::before,
  .butterflies span:nth-child(2)::after {
    background: #ffd84d;
  }

  .butterflies span::before {
    left: 0;
    transform-origin: 100% 50%;
  }

  .butterflies span::after {
    right: 0;
    transform-origin: 0 50%;
  }

  /* The global reduced-motion rule in tailwind.css can't reach pseudo-elements */
  @media (prefers-reduced-motion: reduce) {
    .butterflies span::before,
    .butterflies span::after {
      animation: none;
    }
  }

  @keyframes turntable {
    to {
      rotate: y 328deg;
    }
  }

  @keyframes hover {
    to {
      translate: 0 -5px;
    }
  }

  @keyframes bob {
    to {
      transform: translateY(-6px);
    }
  }

  @keyframes spin {
    to {
      rotate: 360deg;
    }
  }

  @keyframes flow {
    from {
      translate: 0 -50%;
    }
  }

  @keyframes glint {
    0%,
    55% {
      translate: -150% 0;
    }
    85%,
    100% {
      translate: 450% 0;
    }
  }

  @keyframes drift {
    from {
      translate: -70px 0;
    }
    to {
      translate: 300px 0;
    }
  }

  @keyframes shoot {
    0%,
    90% {
      translate: 0 0;
      opacity: 0;
    }
    92% {
      opacity: 1;
    }
    100% {
      translate: -110px 58px;
      opacity: 0;
    }
  }

  @keyframes beacon {
    0%,
    70%,
    100% {
      opacity: 0.15;
    }
    80% {
      opacity: 1;
    }
  }

  @keyframes float {
    to {
      translate: 14px -18px;
    }
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes flap {
    to {
      scale: 0.25 1;
    }
  }

  @keyframes flutter {
    0%,
    100% {
      translate: 0 0;
    }
    25% {
      translate: 30px -18px;
    }
    50% {
      translate: 12px 10px;
    }
    75% {
      translate: -24px -6px;
    }
  }
</style>
