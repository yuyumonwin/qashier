<template>
  <div class="displayNumber">{{ info.availableLot }} &nbsp;</div>
  <div class="tooltip">
    <i class="fa fa-info-circle"></i>
    <span class="tooltip-text">
      Park number - Lot
      {{ info.parkNumber }} - {{ info.lotType }}
    </span>
  </div>
</template>

<script>
export default {
  name: "ParkInfo",
  props: {
    info: Object,
  },
};
</script>

<style scope>
.displayNumber {
  display: inline-block;
  width: 100px;
  text-align: right;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltip-text {
  visibility: hidden;
  width: 140px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  margin: 8px;
  font-size: 0.8em;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
}
</style>
