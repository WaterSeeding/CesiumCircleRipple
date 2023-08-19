import * as Cesium from 'cesium';
import { CircleRippleMaterialProperty } from './CircleRippleMaterialProperty';
import Effect from './Effect';

class CircleRipple extends Effect {
  count!: number;
  constructor(viewer: Cesium.Viewer, id: string) {
    super(viewer, id);
  }

  change_duration(d: number) {
    super.change_duration(d);
    const curEntity = this.viewer.entities.getById(this.id);
    // @ts-ignore;
    curEntity!.ellipse!.material!.duration = d;
  }

  change_waveCount(d: number) {
    const curEntity = this.viewer.entities.getById(this.id);
    // @ts-ignore;
    curEntity!.ellipse!.material!.count = d;
  }
  /**
   * @description:
   * @param {*} position 位置
   * @param {*} color 颜色
   * @param {*} maxRadius 最大半径
   * @param {*} duration 扩散间隔
   * @param {*} isedit 是否已经编辑
   * @param {*} count 扩散圆数量
   * @return {*}
   */
  add(
    position: number[],
    color: string,
    maxRadius: number,
    duration: number,
    isedit = false,
    count = 3,
  ) {
    super.add(position, color, maxRadius, duration, isedit);
    const _this = this;
    this.count = count;
    this.viewer.entities.add({
      id: _this.id,
      position: Cesium.Cartesian3.fromDegrees(
        position[0],
        position[1],
        position[2],
      ),
      ellipse: {
        semiMinorAxis: new Cesium.CallbackProperty(function (n) {
          return _this.maxRadius;
        }, false),
        semiMajorAxis: new Cesium.CallbackProperty(function (n) {
          return _this.maxRadius;
        }, false),
        // @ts-ignore;
        material: new CircleRippleMaterialProperty({
          duration: duration,
          gradient: 0.5,
          color: Cesium.Color.fromCssColorString(color),
          count: count,
        }),
      },
    });
  }
}

export default CircleRipple;
