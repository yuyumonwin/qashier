import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  locale: "en",
  messages: {
    en: {
      message: {
        carpark_availability: "Carpark Availability",
        categories: "Categories",
        highest_availability_lots: "Highest Availability Lots",
        lowest_availability_lots: "Lowest Availability Lots",
        small: "Small",
        medium: "Medium",
        big: "Big",
        large: "Large",
        park_number: "Park Number",
        park_lot_type: "Lot Type",
      }
    },
  }
});