<template>
    <div v-for="[key, value] in infoList">
        <ParkInfo :info="value"/>
    </div>
</template>

<script>
import ParkInfo from "./ParkInfo.vue";
export default {
    name: 'ParkInfoList',
    props: {
        infoList: Map,
    },
    components: {
        ParkInfo,
    },
}
</script>