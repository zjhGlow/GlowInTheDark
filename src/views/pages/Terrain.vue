<template>
    <div class="warp">
        <div id="terrain"></div>
        <div class="canvasUtils">
            <div class="btn">点位</div>
        </div>
        <div id="toolbar">
            <!-- <select data-bind="options: exampleTypes, value: currentExampleType"></select>
            <input type="checkbox" value="false" data-bind="checked: clippingPlanesEnabled, valueUpdate: 'input'"> Globe clipping planes enabled
            <input type="checkbox" value="false" data-bind="checked: edgeStylingEnabled, valueUpdate: 'input'"> Edge styling enabled -->
        </div>
    </div>
</template>

<script>
import * as Cesium from "cesium/Cesium";
import * as widgets from "cesium/Widgets/widgets.css";

window.viewer = null
window.Cesium = Cesium

import Convenient from '../viewer/js/convenient'
import InitCesium from '../viewer/js/initCesium'
import Draw from '../viewer/js/draw'
export default {
    data(){
        return {
            title:'挖开地形',
            earth:null,
            convenient:null,
            draw:new Draw()
        }
    },
    mounted(){
        this.initEarth()
    },
    methods:{
        initEarth(){
            this.earth = new InitCesium('terrain',{
                skyAtmosphere: false,
                shouldAnimate : true
            })
            this.convenient = new Convenient({viewer})
            
            this.clipPlans()
        },
        clipPlans(){
            console.log('准备挖地');

            // this.convenient.fly({
            //     x: -2257549.134074059, y: 5021854.213918942, z: 3210368.2028043577,
            //     heading:0.5346327843776102,
            //     pitch:-1.0089680584335934,
            //     roll:0.0000011910475938847753
            // })
            // let entity = this.draw.addSpace({
            //     name:'box',
            //     positions:[
            //         114.20817891515223,30.418170161830858,0,
            //         114.2097781518594,30.417373641094883,0,
            //         114.20887887549375,30.415998767547897,0,
            //         114.20717378368053,30.416863828854257,0
            //     ],
            //     height:30,
            // })


            let entity = viewer.entities.add({
                position: Cesium.Cartesian3.fromDegrees(114.20846226776789,30.417140454742395,0),
                box: {
                    dimensions: new Cesium.Cartesian3(1400.0, 1400.0, 2800.0),
                    material: Cesium.Color.WHITE.withAlpha(0.3),
                    outline: true,
                    outlineColor: Cesium.Color.WHITE
                }
            });

            let model = viewer.entities.add({
                position : Cesium.Cartesian3.fromDegrees(114.20846226776789,30.417140454742395,-100),
                model : {
                    uri : '/CesiumMan/Cesium_Man.glb',
                    minimumPixelSize : 128,
                    maximumScale : 800
                }
            });

            let globe = viewer.scene.globe;

            globe.depthTestAgainstTerrain = true;
            console.log(entity.computeModelMatrix(Cesium.JulianDate.now()));
            globe.clippingPlanes = new Cesium.ClippingPlaneCollection({
                modelMatrix: entity.computeModelMatrix(Cesium.JulianDate.now()),
                planes: [
                    new Cesium.Plane(new Cesium.Cartesian3(1.0, 0.0, 0.0), -700.0),
                    new Cesium.Plane(new Cesium.Cartesian3(-1.0, 0.0, 0.0), -700.0),
                    new Cesium.Plane(new Cesium.Cartesian3(0.0, 1.0, 0.0), -700.0),
                    new Cesium.Plane(new Cesium.Cartesian3(0.0, -1.0, 0.0), -700.0)
                ],
                edgeWidth: 1.0,
                edgeColor: Cesium.Color.WHITE
            });
            viewer.zoomTo(model)
        }
    },
}
</script>

<style scoped lang="less">
#toolbar {
        background: rgba(42, 42, 42, 0.8);
        padding: 4px;
        border-radius: 4px;
    }
    #toolbar input {
        vertical-align: middle;
        padding-top: 2px;
        padding-bottom: 2px;
    }
.warp{
    width: 79vw;
    height: 88vh; 
    position: relative;

    #terrain{
        width: 79vw;
        height: 88vh; 
    }
    
    .canvasUtils{
        width: 10vw;
        height: 20vh;
        position: absolute;
        left: 1vw;
        top: 10vh;
        background:rgba(255, 255, 255, 0.3);
    }
}
    
</style>