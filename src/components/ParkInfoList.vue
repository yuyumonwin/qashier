<template>
    <div v-for="info in infoList">
        <!-- <Task @toggle-reminder="$emit('toggle-reminder', task.id)" @delete-task="$emit('delete-task', task.id)" :task="task"/> -->
        <ParkInfo/>
    </div>
</template>

<script>
import ParkInfo from "./ParkInfo.vue"
export default {
    name: 'ParkInfoList',
    props: {
        infoList: Array,
    },
    components: {
        ParkInfo,
    },
        // emits: ['delete-task', 'toggle-reminder']
}
</script>