<template>
  <div>
    <CarPark/>
  </div>
</template>

<script>
import CarPark from './components/CarPark.vue';

export default {
  name: 'App',
  components: {
    CarPark,
  },
  data() {
    return {
      lots: [],
    }
  },
  methods: {
  },
  created() {
    this.lots = [
      {
        id: 1,
        text: 'Doctors Appointment',
        day: 'March 1st at 2:30pm',
        reminder: true,
      },
      {
        id: 2,
        text: 'Meeting at School',
        day: 'March 3rd at 1:30pm',
        reminder: true,
      },
      {
        id: 3,
        text: 'Food Shopping',
        day: 'March 3rd at 11:00am',
        reminder: false,
      }
    ]
  }
}
</script>