<template>
  <div v-if="isLoading" class="loading"></div>
  <div v-show="!isLoading">
    <CarPark :carparkAvailability="carparkAvailability" />
  </div>
  <div v-if="isError" class="message">{{ $t("message.error_message") }} {{this.lastUpdated}}</div>
</template>

<script>
import CarPark from "./components/CarPark.vue";

export default {
  name: "App",
  components: {
    CarPark,
  },
  data() {
    return {
      lastUpdated: "",
      isError: false,
      isLoading: true,
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

                this.isLoading = false;
                this.isError = false;
              }
            });
          });
        })
        .catch(() => {
          this.isError = true;

                this.lastUpdated = (new Date()).toString();
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
.loading {
  background: transparent
    url("https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif") center
    no-repeat;
  height: 200px;
  width: 200px;
  margin: auto;
}

.message {
  width: 100%;
  min-width: 400px;
  margin: 25px 0;
  font-size: 1em;
  font-family: sans-serif;
  text-align: center;
}
</style>
