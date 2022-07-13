<template>
  <div id="container"></div>
</template>
<script src="./js/lutai_wisdom_building.js"></script>
<script>
import * as Cesium from "cesium/Cesium";
import * as widgets from "cesium/Widgets/widgets.css";

window.viewer = null
window.Cesium = Cesium

import Earth from './js/index'
import Popup from './popup/index'
import BuildPopup from './buildPopup/index'
import Draw from './draw/draw.js'
import { buildData } from './js/lutai_wisdom_building.js'
import { EventBus } from './js/eventBus'
export default {
    name: "HelloCesium",
    data(){
        return {
            popup:null, // 弹窗
            earth:null, // 地球
            buildsArr:buildData(),
            draw:new Draw(),
            overview:[],  // 总览组件实体
            buildEnty:[],  // 楼宇盒子实体
            buildPopup:[],  // 楼宇指示牌
        }
    },
    mounted() {
        this.init()
        this.listenr()

        
        EventBus.$on('post',(id)=>{
            this.$emit('currentBuild',id)
        })
        // EventBus.$off('post')    在楼宇牌子消失时移除监听
    },
    methods:{
        // 初始化
        init(){
            this.earth = new Earth('container')

            var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
                url:'/lutaidasha/tileset.json',
                maximumScreenSpaceError: 1,
                maximumMemoryUsage: 2048,
            }))
            // viewer.zoomTo(tileset)
            // 将倾斜模型的位置贴于地面
            tileset.readyPromise.then(function (tileset) {
                // 正常的倾斜摄影自带地理信息
                var boundingSphere = tileset.boundingSphere;
                var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);//获取到倾斜数据中心点的经纬度坐标（弧度）
                var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0);//倾斜数据中心点的笛卡尔坐标
                var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, -27);//带高程的新笛卡尔坐标
                var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());//做差得到变换矩阵
                tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
            })
            // //瓦片样式
            tileset.style = new Cesium.Cesium3DTileStyle({
                color: 'color("white",1)'
            })

            viewer.camera.setView({
                destination: new Cesium.Cartesian3(-2331133.5821877527, 4656720.474077167, 3670694.896147476,),
                orientation: {
                    heading: 6.282423779410175,
                    pitch: -0.6741756357814701,
                    roll: 6.283182212385899,
                }
            })
            this.firstLoad()
        },
        firstLoad() {
            let flag = true
            let helper = new Cesium.EventHelper()  // 便利对象
            let num = 0
            // 添加监听事件
            helper.add(viewer.scene.globe.tileLoadProgressEvent, function(event) {
                // console.log(event);

                console.log("每次加载矢量切片都会进入这个回调");
                
                if(event == 0 && flag == true){
                    flag = false
                    console.log("这个是加载最后一个矢量切片的回调")
                    
                }
            })
        },
        listenr(){
            let _this = this
            document.addEventListener('keydown', function(key){
                switch(key.key){
                    case '1':
                        console.log(viewer.camera.position)
                        console.log(viewer.camera.heading)
                        console.log(viewer.camera.pitch)
                        console.log(viewer.camera.roll)
                    break;
                    case '2':
                        _this.addSpace()
                    break;
                    case '3':
                        _this.overview.forEach(item =>{    // 清除实体
                            viewer.entities.remove(item)
                        })
                        
                    break;
                    default:
                        break;
                }
            })
        },
        addLabel(id){
            let build = this.buildsArr.find(item =>item.id == id)
            let _this = this
            build.modelFloors.forEach(item =>{
                let label = _this.draw.addLabel({
                    name: item.name, 
                    text: item.text, 
                    position:{
                        lon: item.lon, lat: item.lat, alt: item.alt
                    },
                    font:'24pt zcoolqingkehuangyouti'
                })
                // electricArr.push(label)
            })
        },
        // 添加入口
        addBillboard(){
            let entrance = this.draw.addBillboard({
                position: {lon: 116.59283837738305,lat:35.3623943378037,alt:0.5},
                image: require('@/assets/img/entrance.png'), 
                scale: 0.3,
            })
            this.overview.push(entrance)
        },
        // 添加外墙
        addParkWall(){
            let wall = this.draw.addWall({
                positions:[
                    116.59286292557316,35.36242995839889,1,
                    116.59285116091955,35.3633475637914,1,
                    116.59112652050597,35.36336388978131,1,
                    116.5910521118016,35.362347890071455,1,
                    116.59286710301934,35.36234910392014,1,
                ],
                wallHeights:[25, 25, 25, 25, 25],
                image:require('@/assets/img/wall.png')
            })
            this.overview.push(wall)
        },
        // 点击园区概况
        selectMenuPark(){
            this.addParkWall()
            this.addBillboard()

            this.popup = new Popup({title:'园区弹框',position:{lon:116.59236786273614, lat:35.36293875609138, alt:50}})

            this.earth.fly({
                x:-2331133.5821877527, y:4656720.474077167, z:3670694.896147476, 
                heading:6.282423779410175, pitch: -0.6741756357814701, roll: 6.283182212385899
            })
        },
        // 反选园区概况
        cancleMenuPark(){
            this.overview.forEach(item =>{    // 清除实体
                viewer.entities.remove(item)
            })
            this.popup.windowClose()  // 关闭弹窗
        },
        addSpace(id){
            let build = this.buildsArr.find(item =>item.id == id)
            let _this = this
            // this.buildsArr.forEach(item =>{
                let space = _this.draw.addSpace({
                    name:'build',
                    positions:build.buildSpace,
                    height:0,
                    color:Cesium.Color.fromCssColorString('#5D91FA').withAlpha(0.4),
                    lineColor:Cesium.Color.fromCssColorString('#5D91FA')
                })
                this.buildEnty.push(space)
            // })
        },
        addBuildPopup(){
            let _this = this
            this.buildsArr.forEach(item =>{
                let buildPopup = new BuildPopup({
                    id:item.id,
                    flag:item.flag,
                    name:item.name,
                    position :{
                        lon:item.lon,
                        lat:item.lat,
                        alt:item.alt
                    }
                })
                _this.buildPopup.push(buildPopup)
            })
        },
    }
}
</script>
<style scoped>
#container {
    width: 100vw;
    height: 100vh;
    /* width: 79vw;
    height: 88vh; */
    /* position: fixed;
    top: 0;
    left: 0; */
    /* z-index: 0; */
}
</style>