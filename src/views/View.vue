<template>
    <div class="views">
        内容:{{$route.params.tel}}
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    mounted(){
        console.log(this.$route.params.tel)
    }
}
</script>

<style lang="less" scoped>
    .views{
        width: 100%;
        height: 100%;
        background-color: pink;
        border-radius: 10rem;
    }
</style>