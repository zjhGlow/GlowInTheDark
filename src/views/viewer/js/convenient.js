export default class Convenient{
    constructor(params){
        let {
            viewer
        } = params
        this.viewer = viewer
        this.canvas = viewer.scene.canvas;

    }

    // 相机飞行 
    fly(target){
        let { x, y, z, heading, pitch, roll } = target
        this.viewer.camera.flyTo({
            destination:new Cesium.Cartesian3(x, y, z),
            orientation:{heading,pitch,roll},
            duration:3
        })
    }
    // 获取屏幕四角的经纬度坐标
    _getAngularPoints(){
        var car_lt = this._getCart3ByPIckEllipsoid(new Cesium.Cartesian2(0,0));
        var car_lb = this._getCart3ByPIckEllipsoid(new Cesium.Cartesian2(0,this.canvas.height));
        var car_rt = this._getCart3ByPIckEllipsoid(new Cesium.Cartesian2(this.canvas.width,0));
        var car_rb = this._getCart3ByPIckEllipsoid(new Cesium.Cartesian2(this.canvas.width,this.canvas.height));
        var car3s=[car_lt,car_rt,car_rb,car_lb];
        for(var i in car3s){
            car3s[i] = this._getDegreesByCartesian3(car3s[i])
        }
        // console.log(car3s);
        return car3s;

    }
    // 三维坐标转经纬度
    _getDegreesByCartesian3(car3){
        let cartographic = Cesium.Cartographic.fromCartesian(car3);
        let lon = Cesium.Math.toDegrees(cartographic.longitude);
        let lat = Cesium.Math.toDegrees(cartographic.latitude);
        console.log(cartographic, cartographic.height);
        let height = cartographic.height
        return { lon, lat, height };
    }

    // 获取当前屏幕中间的坐标
    _getCenterOfScreen(){
        return this._getCart3ByPIckEllipsoid(new Cesium.Cartesian2(this.viewer.scene.canvas.width/2,this.viewer.scene.canvas.height/2));
    }
    // 将二维坐标转为三维坐标
    _getCart3ByPIckEllipsoid(Car2){
        let car3 = this.viewer.camera.pickEllipsoid(Car2,this.viewer.scene.globe.ellipsoid);
        if(!car3){
            var yIndex = 0;
            do{
                yIndex <= this.canvas.height? yIndex += 10:this.canvas.height;
                car3 = this.viewer.camera.pickEllipsoid(new Cesium.Cartesian2(Car2['x'],yIndex),this.viewer.scene.globe.ellipsoid);
            }while (!car3);
        }
        return car3;
    }
    // 这两个 不懂什么意思 
    // showInspector(){
    //     viewer.extend(Cesium.viewerCesiumInspectorMixin);
    // }
    // show3DInspector(){
    //    viewer.extend(Cesium.viewerCesium3DTilesInspectorMixin);
    // }
}