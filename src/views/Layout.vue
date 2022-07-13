<template>
    <div class="layout">
        <aside class="tab_aside">
            <Aside />
        </aside>
        <div class="content">
            <nav class="head_nav">
                <Header />
            </nav>
            <div class="view">
                <div class="con">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const Aside = ()=>import('@/views/Aside')
const Header = ()=>import('@/views/Header')
export default {
    data(){
        return {

        }
    },
    components:{
        Aside,Header,
    }
}
</script>

<style scoped lang="less">
    .layout{
        width: 100vw;
        height: 100vh;
        overflow: hidden;

        .tab_aside{
            float: left;
            width: 20vw;
            height: 100vh;
        }

        .content{
            float: left;
            width: calc(100vw - 20vw);
            height: 100%;

            .head_nav{
                width: 100%;
                height: 10vh;
            }

            .view{
                width: 100%;
                height: calc(100vh - 10vh);
                background-color: pink;
                box-sizing: border-box;
                padding: 1vh 0.5vw;

                .con{
                    width: 79vw;
                    height: 88vh;
                    border-radius: 1vh;
                    overflow: hidden;
                    background: #fff;
                }
            }
        }
    }
</style>