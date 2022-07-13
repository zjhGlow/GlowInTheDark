
export default class Draw{
    constructor(){

    }

    addLabel(params){
        let {
            text = '',
            name = "",
            position = {},
            font,
            color = '#FF4500'
        } = params
        let label = viewer.entities.add({
            name,
            position:new Cesium.Cartesian3.fromDegrees(position.lon, position.lat, position.alt),
            label:{
                text,
                font,
                disableDepthTestDistance:Number.POSITIVE_INFINITY,
                fillColor:Cesium.Color.WHITE,
                backgroundColor:Cesium.Color.BLACK,
                showBackground:false,
                style:Cesium.LabelStyle.FILL,
                verticalOrigin:Cesium.VerticalOrigin.CENTER,
                horizontalOrigin:Cesium.HorizontalOrigin.CENTER,
                pixelOffset:new Cesium.Cartesian2(5, 0),
                scale:1,
                // translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2), //随距离改变透明度
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1, 800), //x米之内，y米之外不显示
                scaleByDistance:new Cesium.NearFarScalar( 10, 1.5, 800, 0.2), //随距离改变大小
                // outline:true,
                // outlineColor:Cesium.Color.ORANGE,
                // outlineWidth:100
                show:true
            }
        })
        return label
    }

    addBillboard(params){
        let {
            name = "",
            position = {},
            image,
            scale,
        }  = params
        let billboard = viewer.entities.add({
            name,
            position:Cesium.Cartesian3.fromDegrees(position.lon, position.lat, position.alt),
            billboard:{
                image,
                scale,
                disableDepthTestDistance: Number.POSITIVE_INFINITY, //应用深度测试
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM, //广告牌垂直原点
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER, //广告牌水平原点
                //sizeInMeters : true, //图像的尺寸被指定成图像实际的尺寸
                scaleByDistance: new Cesium.NearFarScalar( 10, 2, 500, 0.4), //随距离改变大小
                // translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2), //随距离改变透明度
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1, 800), //x米之内，y米之外不显示
                show:true
            }
        })
        return billboard
    }

    addWall(params){
        let { 
            positions = [],
            wallHeights = [],
            image
        } = params
        let wall = viewer.entities.add({
            wall:{
                positions:Cesium.Cartesian3.fromDegreesArrayHeights(positions),
                minimumHeights:wallHeights,
                material:new Cesium.ImageMaterialProperty({
                    image,
                    transparent:true,
                    color:new Cesium.CallbackProperty(play, false)
                })
            },
            show:true
        })
        let alp = 0.4
        let numflag = 0
        function play(){
            if ((numflag % 2) === 0) {
                alp += 0.01;
            } else {
                alp -= 0.01;
            }

            if (alp <= 0.4) {
                numflag++;
            } else if (alp >= 1) {
                numflag--;
            }
            return Cesium.Color.AQUA.withAlpha(alp)
        }

        return wall
    }

    addSpace(params){
        let { 
            name = "",
            positions = [],
            height,
            color,
            lineColor
        } = params
        let space = viewer.entities.add({
            name,
            polygon:{
                hierarchy:Cesium.Cartesian3.fromDegreesArrayHeights(positions),
                extrudedHeight:height,
                disableDepthTestDistance: Number.POSITIVE_INFINITY, //应用深度测试
                perPositionHeight: true,
                material: color,
                outline: true,
                outlineColor: lineColor,
            }
        })
        return space
    }
}