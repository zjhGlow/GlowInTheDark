
export default class Earth {
    constructor(container){
        Cesium.Ion.defaultAccessToken =
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYjZjYWUyZi00YWRkLTRjMjUtYmNmNC0xMWViMjgxYjI4MDgiLCJpZCI6NjYxMjEsImlhdCI6MTYzMDY1MzcxN30.GTEf3cn_2IGsuOoqIuznPJ_D8py8PUt97UG7THjymnc';
        viewer = new Cesium.Viewer(container, {
            // terrainProvider: Cesium.createWorldTerrain(),
            selectionIndicator: false,
            infoBox: false,
            geocoder: false,
            homeButton: false,
            sceneModePicker: false,
            baseLayerPicker: false,
            navigationHelpButton: false,
            timeline: false,
            fullscreenButton: false,
            vrButton: false,
            animation: false,
            shouldAnimate: true,
            imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=f97243c663a67e7928539593008296ea",
                layer: "img",
                style: "default",
                format: "tiles",
                tileMatrixSetID: "w",
                credit: new Cesium.Credit('天地图全球影像服务'),
                subdomains: ['t0', "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
                minimumLevel: 0,
                maximumLevel: 15,
                show: true,
                // rectangle: new Cesium.Rectangle(0.0, 0.0, 0.0, 0.0)
            })
        });
        viewer.scene.globe.show = false //隐藏地球
        viewer._cesiumWidget.creditContainer.style.display = "none"
        // 屏蔽默认双击追踪事件
        viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)

        viewer.scene.screenSpaceCameraController.zoomEventTypes = [
            Cesium.CameraEventType.WHEEL, 
            Cesium.CameraEventType.PINCH
        ];

        viewer.scene.screenSpaceCameraController.tiltEventTypes = [
            Cesium.CameraEventType.PINCH,
            Cesium.CameraEventType.LEFT_DRAG
        ]

        viewer.scene.screenSpaceCameraController.rotateEventTypes = [
            Cesium.CameraEventType.RIGHT_DRAG
        ]

        viewer.scene.screenSpaceCameraController.inertiaTranslate = 0
        viewer.scene.screenSpaceCameraController.inertiaSpin = 0

        if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) { //判断是否支持图像渲染像素化处理
            viewer.resolutionScale = window.devicePixelRatio;
        }

        this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
        this.addHandler()
    }

    addHandler(){
        this.handler.setInputAction(function (moment) {
            let ellipsoid = viewer.scene.globe.ellipsoid
            let worldPosition = viewer.scene.camera.pickEllipsoid(moment.position, ellipsoid)
            console.log('世界坐标: ' + worldPosition.x + ',' + worldPosition.y + ',' + worldPosition.z)
            let cartographic = ellipsoid.cartesianToCartographic(worldPosition)
            console.log('弧度: ' + cartographic.longitude + ',' + cartographic.latitude + ',' + cartographic.height)
            
            let lon = Cesium.Math.toDegrees(cartographic.longitude)
            let lat = Cesium.Math.toDegrees(cartographic.latitude)
            let alt = cartographic.height
            console.log('经纬度: ' + lon + ',' + lat + ',' + alt)

            let heading = Cesium.Math.toDegrees(viewer.camera.heading).toFixed(2)
            let pitch = Cesium.Math.toDegrees(viewer.camera.pitch).toFixed(2)
            let roll = Cesium.Math.toDegrees(viewer.camera.roll).toFixed(2)
            console.log(heading + ',' + pitch + ',' + roll);
        },Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    }

    fly(target){
        let { x, y, z, heading, pitch, roll } = target
        viewer.camera.flyTo({
            destination:new Cesium.Cartesian3(x, y, z),
            orientation:{heading,pitch,roll},
            duration:3
        })
    }
}