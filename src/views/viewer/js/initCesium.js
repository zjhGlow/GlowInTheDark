
export default class InitCesium {
    constructor(el, options){
        Cesium.Ion.defaultAccessToken =
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYjZjYWUyZi00YWRkLTRjMjUtYmNmNC0xMWViMjgxYjI4MDgiLCJpZCI6NjYxMjEsImlhdCI6MTYzMDY1MzcxN30.GTEf3cn_2IGsuOoqIuznPJ_D8py8PUt97UG7THjymnc';
        
        viewer = new Cesium.Viewer(el, this._setOptions(this._defalutCesiumParameter(),options))

        viewer.scene.globe.show = true //隐藏地球
        viewer._cesiumWidget.creditContainer.style.display = "none"
        viewer.terrainProvider = Cesium.createWorldTerrain();   // 地形数据
        // viewer.imageryLayers.addImageryProvider(    // 地图标注
        //     new Cesium.UrlTemplateImageryProvider({
        //     url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
        //     })
        // );

        // viewer.imageryLayers.addImageryProvider(  // 添加图片图层
        //     new Cesium.SingleTileImageryProvider({
        //     url: url2,
        //     })
        // );

        if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) { //判断是否支持图像渲染像素化处理
            viewer.resolutionScale = window.devicePixelRatio;
        }

        this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
        this._addHandler()

        this._defaultControls()
    }
    // 默认参数 
    _defalutCesiumParameter(){
        return {
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
	        scene3DOnly: true,
	        terrainProvider: new Cesium.EllipsoidTerrainProvider({}),
            imageryProvider:new Cesium.WebMapTileServiceImageryProvider({
                url: "http://{s}.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0" +
                    "&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
                    "&style=default&format=tiles&tk=65f301fcf76d9c4af0682eee02b7a7b9",
                layer: "tdtCva",
                style: "default",
                format: "tiles",
                tileMatrixSetID: "c",
                credit: new Cesium.Credit('天地图全球影像服务'),
                subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
                tilingScheme: new Cesium.GeographicTilingScheme(),
                tileMatrixLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"],
                maximumLevel: 17,
                show: false
            }),
            // imageryProvider: new Cesium.SingleTileImageryProvider({
            //     url,
            // }),
            contextOptions: {
                webgl: {
                    alpha: true,
                    depth: false,
                    stencil: true,
                    antialias: true,
                    premultipliedAlpha: true,
                    preserveDrawingBuffer: true,//通过canvas.toDataURL()实现截图需要将该项设置为true
                    failIfMajorPerformanceCaveat: true
                }, allowTextureFilterAnisotropic: true
            },
        }
    }

    _setOptions(defaultParameter, options){
        return Object.assign({}, defaultParameter, options)
    }
    // 修改默认操作
    _defaultControls(){
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

    }
    // 方便调试
    _addHandler(){
        let _this = this
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
            console.log('俯仰角: ' +heading + ',' + pitch + ',' + roll);

            console.log(viewer.camera.position)
            console.log('heading:' +  viewer.camera.heading)
            console.log('pitch:' +  viewer.camera.pitch)
            console.log('roll:' + viewer.camera.roll)
        },Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    }
    
}