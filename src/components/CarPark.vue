<template>
    <header>
        <h1>Carpark Availability</h1>
    </header>
    <main>
    <div style="overflow-x:auto;">
      <table class="styled-table">
      <thead>
          <tr>
              <th>
                Carpark Categories
              </th>
              <th>Highest available lots</th>
              <th>Lowest available lots</th>
          </tr>
      </thead>
      <tbody>
            <tr v-for="[key, value] in carparkAvailability" class="active-row">
                <td> {{key}} </td>
                <td v-for="[k, v] in value">
                    <ParkInfo :info="v"/>
                </td>
            </tr>
      </tbody>
  </table>
</div>
    </main>
  </template>


<script>
import ParkInfo from './ParkInfo.vue';

export default {
  name: 'CarPark',
  components: {
    ParkInfo
},
  data() {
    return {
        carparkAvailability : new Map(),
    }
  },
  methods: {
    async getList() {
          this.axios
        .get('https://api.data.gov.sg/v1/transport/carpark-availability')
        .then((response) => {
          let responseData = response.data.items[0].carpark_data;
          responseData.forEach((data) => {
            let lots = data.carpark_info;

            let info = {
                parkNumber: null,
                lotType: null,
                availableLot: null,

            }
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
                    }  else if (total < 300 && total >= 200) {
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
                    } else if (low.availableLot > available)  {
                        availableByCategory.set(lowKey, info);
                    }
                    this.carparkAvailability.set(key, availableByCategory);
                }
            });
        });
    });
    },
    
},
  async created() {
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

    await this.getList()
  }
}
</script>



<style scoped>

.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

.styled-table {
    padding: 4px;
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 1.2em;
    font-family: sans-serif;
    min-width: 400px;
    width: 100%;
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

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
