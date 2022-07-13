<template>
    <div class="popup">
        <div class="parkContainer">
            <div class="dataContainer">
                <div class="title">
                    <div class="icon" @click="close"></div>
                    <div class="icright">
                        <div class="name">{{title}}</div>
                        <div class="area">631333㎡</div>
                    </div>
                </div>
                <div class="address">地址: 山东省济宁市鱼台县创新大道</div>
                <div class="dataItemContainer">
                    <div class="dataItem">
                        <div class="data_title">年用电量</div>
                        <div class="data_value">321<span>kWh</span></div>
                    </div>
                    <div class="dataItem">
                        <div class="data_title">站点数量</div>
                        <div class="data_value">1</div>
                    </div>
                    <div class="dataItem">
                        <div class="data_title">网关在线</div>
                        <div class="data_value">123<span>/123</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['title'],
    data(){
        return {

        }
    },
    methods:{
        close(){
            if(this.closeWin){
                this.closeWin()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.popup{
    position: fixed;
    bottom:50vh ;
    left: 45vw;
    z-index: 1;
    .parkContainer {
        width:420px ;    
        height: 260px;
        background-image: url('../../../assets/img/bgearth.jpg');
        background-size: 100% 100%;

        .dataContainer {
            width: 336px;
            position: absolute;
            top: 5px;
            left: 30px;
            padding: 24px 0 0 10px;

            .title {
                width: 100%;
                height: 48px;

                .icon {
                    float: left;
                    width: 50px;
                    height: 50px;
                    background-image: url('../../../assets/logo.png');
                    background-size: 100% 100%;
                    position: relative;
                }

                .icright{
                    float: left;
                    height: 50px;

                    .name {
                        font-size: 24px;
                        color: #E6F3FD;
                        margin-left: 10px;
                        font-weight: bold;
                    }

                    .area {
                        font-size: 14px;
                        color:  #E6F3FD;
                        margin-left: 10px;
                    }
                }
            }

            .address {
                font-size:14px;
                color: rgba(230,243,253, 0.5);
                padding: 8px 0;
                height: 36px;
            }

            .dataItemContainer {
                width: 100%;
                height:60px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                padding-top: 1vh;
                border-top: 1px solid rgba(255, 255, 255, 0.3) ;
                position: relative;

                .dataItem {
                    width: 33%;
                    height: 60px;
                    text-align: center;
                    
                    .data_title {
                        font-size: 1.4vh;
                        color: rgba(230,243,253, 0.7);
                    }

                    .data_value {
                        font-size: 20px;
                        font-family: zcoolqingkehuangyouti;
                        color: #00DEFF;
                        padding-top: 12px;
                        font-weight: 400;
                        &>span{
                            display: inline-block;
                            font-size: 14px;
                        }
                    }
                }
            }
            .dataItemContainer::before{
                content: '';
                width: 1px;
                height: 1px;
                border: 1px solid rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                position: absolute;
                top: -2px;
                left: -1.5px;
            }

            .dataItemContainer::after{
                content: '';
                width: 1px;
                height: 1px;
                border: 1px solid rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                position: absolute;
                top: -2px;
                right:-1.5px; 
            }
        }
    }
}
</style>