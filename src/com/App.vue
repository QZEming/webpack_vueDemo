<template>
    <div id="app">
        <h1>this is app</h1>
        <Index></Index>
    </div>
</template>

<script>
import Index from './index.vue'

export default {
    name:"app",
    data(){
        return{}
    },
    components:{
        Index
    }
}
</script>

<style lang="less" scoped>
    #app{
        h1{
            color:#0f0;
        }
    }
</style>
