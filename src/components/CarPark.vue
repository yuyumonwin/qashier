<template>
  <header>
    <h1>{{ $t("message.carpark_availability") }}</h1>
  </header>
  <main>
    <div style="overflow-x: auto">
      <table class="styled-table">
        <thead>
          <tr>
            <th>
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
            <td>{{ $t("message." + key) }}</td>
            <td :key="k" v-for="[k, v] in value">
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
  data() {
    return {
      carparkAvailability: new Map(),
    };
  },
  methods: {
    async getList() {
      this.axios
        .get("https://api.data.gov.sg/v1/transport/carpark-availability")
        .then((response) => {
          let responseData = response.data.items[0].carpark_data;
          responseData.forEach((data) => {
            let lots = data.carpark_info;

            let info = {
              parkNumber: null,
              lotType: null,
              availableLot: null,
            };
            info.parkNumber = data.carpark_number;

            lots.forEach((lot) => {
              info.lotType = lot.lot_type;
              info.availableLot = lot.lots_available;
              let total = lot.total_lots;
              let available = lot.lots_available;

              let highKey = "highest";
              let lowKey = "lowest";
              let key = "";

              if (available != 0) {
                if (total < 100) {
                  key = "small";
                } else if (total < 200 && total >= 100) {
                  key = "medium";
                } else if (total < 300 && total >= 200) {
                  key = "big";
                } else if (total >= 300) {
                  key = "large";
                }

                let availableByCategory = this.carparkAvailability.get(key);
                let high = availableByCategory.get(highKey);
                let low = availableByCategory.get(lowKey);
                if (high.availableLot == 0 && low.availableLot == 0) {
                  availableByCategory.set(lowKey, info);
                  availableByCategory.set(highKey, info);
                } else if (high.availableLot < available) {
                  availableByCategory.set(highKey, info);
                } else if (low.availableLot > available) {
                  availableByCategory.set(lowKey, info);
                }
                this.carparkAvailability.set(key, availableByCategory);
              }
            });
          });
        });
    },
  },
  created() {
    let lotInfo = {
      availableLot: 0,
      parkNumber: null,
      lotType: null,
    };

    let categories = ["small", "medium", "big", "large"];
    categories.forEach((category) => {
      let logMap = new Map();
      logMap.set("highest", lotInfo);
      logMap.set("lowest", lotInfo);
      this.carparkAvailability.set(category, logMap);
    });
  },
  async mounted() {
    // Initial polling.
    await this.getList();
    var loadData = async () => {
      await this.getList();
      // Fetch the data every 10 seconds.
      setTimeout(loadData, 10000);
    };
    setTimeout(loadData, 10000);
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

td {
  text-align: center;
}
</style>
