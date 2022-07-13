<template>
    <div class="aside">
        <div class="title">GLOW</div>
        <div class="warp">
            <router-link class="routerLink" v-for="item in routersList" :key="item.idx" :to="item.to" tag="div">{{item.title}}</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            routersList:[
                {
                    idx:1,
                    to:'/news',
                    title:'页面传参'
                },
                {
                    idx:2,
                    to:'/view/1',
                    title:'动态路由'
                },
                {
                    idx:3,
                    to:'/view/2',
                    title:'动态路由'
                },
                {
                    idx:4,
                    to:'/cesiumView',
                    title:'cesium'
                },
                {
                    idx:5,
                    to:'/terrain',
                    title:'挖地形'
                },
            ]
        }
    }
}
</script>

<style lang="less" scoped>
    .aside{
        width: 100%;
        height: 100%;
        background-color: #000;

        .title{
            font-size: 20px;
            font-weight: bold;
            height: 10vh;
            line-height: 10vh;
            text-align: center;
            color: pink;
            border-bottom: 1px solid pink;
        }

        .warp{
            padding-top: 3vh;

            .routerLink{
                height: 5vh;
                line-height: 5vh;
                color: #778899;
                padding: 1vh 0 1vh 2vw;
                font-size: 16px;
                &:hover{
                    background: pink;
                }
            }
        }
        
    }
</style>