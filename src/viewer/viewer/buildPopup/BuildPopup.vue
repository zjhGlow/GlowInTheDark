<template>
    <div class="buildPopup" @click="showBuild">
        <div class="build" >
            <div class="buildName">{{name}}</div>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../js/eventBus.js'
export default {
    props:['id','name','flag'],
    data(){
        return {

        }
    },
    methods:{
        showBuild(){
            // if(this.showBox){
            //     this.showBox()
            // }
            EventBus.$emit('post',this.id)
        }
    }
}
</script>

<style lang="less" scoped>
.buildPopup{
    position: fixed;
    bottom: 30vh;
    left:30vw;
    z-index: 1;

    .build{
    width: 170px;
    height: 80px;
    background-image: url(../../../assets/logo.png);
    background-size: 100% 100%;
    cursor: pointer;
    margin-left: -80px;

    .buildName{
        color: #fff;
        font-size: 16px;
        font-family: seSource Han Sans CNrif;
        text-align: center;
        position: relative;
        top: 20px;
    }
}
}

</style>