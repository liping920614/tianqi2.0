<template>
    <appnav></appnav>
    <router-view></router-view>
</template>
<script>
   import Appnav from '../components/Appnav.vue';
    export default {
        components:{
            'appnav':Appnav
        }
    }
</script>