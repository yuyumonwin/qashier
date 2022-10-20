<template>
  <header>
    <h1>{{ $t("message.carpark_availability") }}</h1>
  </header>
  <main>
    <div style="overflow-x: auto">
      <table class="styled-table">
        <thead>
          <tr>
            <th class="styled-categories">
              {{ $t("message.categories") }}
            </th>
            <th>{{ $t("message.highest_availability_lots") }}</th>
            <th>{{ $t("message.lowest_availability_lots") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :key="key"
            v-for="[key, value] in carparkAvailability"
            class="active-row"
          >
            <td class="styled-categories">{{ $t("message." + key) }}</td>
            <td :key="k" v-for="[k, v] in value" style="text-align: center">
              <ParkInfo :info="v" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import ParkInfo from "./ParkInfo.vue";

export default {
  name: "CarPark",
  components: {
    ParkInfo,
  },
  props: {
    carparkAvailability: new Map(),
  },
};
</script>

<style scoped>
.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table {
  width: 100%;
  min-width: 400px;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 1.2em;
  font-family: sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: center;
}

.styled-categories {
  text-align: left;
  padding-left: 24px;
}
</style>
