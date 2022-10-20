<template>
    <main>
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
          <tr>
              <td>Small</td>
              <td>{{carParks.small.h? carParks.small.h.availableLot: 0}}</td>
              <td>{{carParks.small.l? carParks.small.l.availableLot: 0}}</td>
          </tr>
          <tr class="active-row">
              <td>Medium</td>
              <td>{{carParks.medium.h? carParks.medium.h.availableLot: 0}}</td>
              <td>{{carParks.medium.l? carParks.medium.l.availableLot: 0}}</td>
          </tr>
          <tr class="active-row">
              <td>Big</td>
              <td>{{carParks.big.h? carParks.big.h.availableLot: 0}}</td>
              <td>{{carParks.big.l? carParks.big.l.availableLot: 0}}</td>
          </tr>
          <tr class="active-row">
              <td>Large</td>
              <td>{{carParks.large.h? carParks.large.h.availableLot: 0}}</td>
              <td>{{carParks.large.l? carParks.large.l.availableLot: 0}}</td>
          </tr>
      </tbody>

      {{carParks}}
  </table>
    </main>
  </template>


<script>

export default {
  name: 'CarPark',
  components: {
  },
  data() {
    return {
      carParks: {
            small: {
              h: null,
              l: null,
            },
            medium: {
              h: null,
              l: null,
            },
            big: {
              h: null,
              l: null,
            },
            large: {
              h: null,
              l: null,
            },
          },
    }
  },
  methods: {
    async getList() {
          this.axios
        .get('https://api.data.gov.sg/v1/transport/carpark-availability')
        .then((response) => {
          let responseData = response.data.items[0].carpark_data;

          let structuredData = {
            small: {
              h: null,
              l: null,
            },
            medium: {
              h: null,
              l: null,
            },
            big: {
              h: null,
              l: null,
            },
            large: {
              h: null,
              l: null,
            },
          }

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

                if (available != 0) {
                    if (total < 100) {
                        if (structuredData.small.h == null && structuredData.small.l == null) {
                            structuredData.small.h = info;
                            structuredData.small.l = info;
                        } else if (structuredData.small.h.availableLot < available) {
                            structuredData.small.h = info;
                        } else if (structuredData.small.l.availableLot > available && available != 0)  {
                            structuredData.small.l = info;
                        }
                    } else if (total < 200 && total >= 100) {
                        if (structuredData.medium.h == null && structuredData.medium.l == null) {
                            structuredData.medium.h = info;
                            structuredData.medium.l = info;
                        } else if (structuredData.medium.h.availableLot < available) {
                            structuredData.medium.h = info;
                        } else if (structuredData.medium.l.availableLot > available && available != 0) {
                            structuredData.medium.l = info;
                        }
                    }  else if (total < 300 && total >= 200) {
                        if (structuredData.big.h == null && structuredData.big.l == null) {
                            structuredData.big.h = info;
                            structuredData.big.l = info;
                        } else if (structuredData.big.h.availableLot < available) {
                            structuredData.big.h = info;
                        } else if (structuredData.big.l.availableLot > available && available != 0) {
                            structuredData.big.l = info;
                        }
                    } else if (total >= 300) {
                        if (structuredData.large.h == null && structuredData.large.l == null) {
                            structuredData.large.h = info;
                            structuredData.large.l = info;
                        } else if (structuredData.large.h.availableLot < available) {
                            structuredData.large.h = info;
                        } else if (structuredData.large.l.availableLot > available && available != 0) {
                            structuredData.large.l = info;
                        }
                    }
                }
            });
        });
        this.carParks = structuredData;
    });
    },
},
  async created() {
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
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
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
