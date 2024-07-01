<template>
  <div class="container">
    <div class="center">Tâm</div>
    <div class="circle">1</div>
    <div class="circle">2</div>
    <div class="circle">3</div>
    <div class="circle">4</div>
    <div class="circle">5</div>
    <div class="circle">6</div>
    <div class="circle">7</div>
    <div class="circle">8</div>
  </div>
</template>
<style scoped>
.container {
  position: relative;
  width: 300px;
  height: 300px;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background-color: red;
}

.circle {
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: blue;
  top: 50%;
  left: 50%;
  transform-origin: 0 -100px; /* điều chỉnh khoảng cách từ tâm đến các div xung quanh */
}

.circle:nth-child(2) { transform: rotate(0deg) translateX(-50%); }
.circle:nth-child(3) { transform: rotate(-45deg) translateX(-50%); }
.circle:nth-child(4) { transform: rotate(-90deg) translateX(-50%); }
.circle:nth-child(5) { transform: rotate(-135deg) translateX(-50%); }
.circle:nth-child(6) { transform: rotate(-180deg) translateX(-50%); }
.circle:nth-child(7) { transform: rotate(-225deg) translateX(-50%); }
.circle:nth-child(8) { transform: rotate(-270deg) translateX(-50%); }
.circle:nth-child(9) { transform: rotate(-315deg) translateX(-50%); }
</style>
