<template>
    <div class="viewer">
        <Viewer />
    </div>
</template>

<script>
const Viewer = ()=>import('../../viewer/viewer/Viewer.vue')
export default {
    data(){
        return {

        }
    },
    components:{
        Viewer
    }
}
</script>

<style lang="less" scoped>
.viewer{
    // width: 100vw;
    // height: 100vh;
    width: 79vw;
    height: 88vh;
}
</style>