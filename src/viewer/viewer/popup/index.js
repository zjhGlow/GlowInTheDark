
import winPopup from './Popup.vue'
import Vue from 'vue'

let EL =  Vue.extend(winPopup)

export default class Popup{
    constructor(data){
        let {
            title = '',
            position = {}
        } = data
        this.position = position
        this.EL = new EL({
            propsData:{
                title
            }
        }).$mount()

        this.EL.closeWin = e =>{
            this.windowClose()
        } 

        viewer.cesiumWidget.container.appendChild(this.EL.$el)

        this.addPostRender()
    }

    addPostRender(){
        viewer.scene.postRender.addEventListener(this.postRender, this)
    }

    postRender(){
        if(!this.EL.$el || !this.EL.$el.style) return 
        let canvasHeight = viewer.scene.canvas.height
        let windowPosition = new Cesium.Cartesian2()
        let cartesian3 = new Cesium.Cartesian3.fromDegrees(this.position.lon, this.position.lat, this.position.alt)
        Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, cartesian3, windowPosition)
        this.EL.$el.style.bottom = canvasHeight - windowPosition.y + 'px'
        this.EL.$el.style.left = windowPosition.x - this.EL.$el.offsetWidth / 2 + 'px'

        let cameraPosition = viewer.camera.position
        let height = viewer.scene.globe.ellipsoid.cartesianToCartographic(cameraPosition).height
        height += viewer.scene.globe.ellipsoid.maximumRadius

        if((Cesium.Cartesian3.distance(cameraPosition, cartesian3) < height) && viewer.camera.positionCartographic.height < 50000000){
            this.EL.$el.style.display = "block"
        }else{
            this.EL.$el.style.display = 'none'
        }
    }

    windowClose(){
        if(this.EL){
            this.EL.$el.remove()
            this.EL.$destroy()
        }
        viewer.scene.postRender.removeEventListener(this.postRender, this)
    }
}