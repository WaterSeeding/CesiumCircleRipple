import * as Cesium from 'cesium';

import { CircleRippleMaterialGLSL } from '../glsl/CircleRippleMaterial';
import createPropertyDescriptor from './utils/createPropertyDescriptor';
import getValueOrClonedDefault from './utils/getValueOrClonedDefault';

let CircleRippleMaterialSource = CircleRippleMaterialGLSL.replace(
  /#define GLSLIFY 1/g,
  '',
);

class CircleRippleMaterialProperty {
  _time: number;
  _definitionChanged: Cesium.Event;
  _color: any;
  _colorSubscription: any;
  color: Cesium.Color;
  duration: number;
  count: number;
  gradient: number;

  constructor(ob: {
    duration: number;
    gradient: number;
    color: Cesium.Color;
    count: number;
  }) {
    Object.defineProperties(this, {
      isConstant: {
        get: function () {
          return false;
        },
      },
      definitionChanged: {
        get: function () {
          return this._definitionChanged;
        },
      },
      color: createPropertyDescriptor('color'),
      duration: createPropertyDescriptor('duration'),
      count: createPropertyDescriptor('count'),
    });

    this._time = new Date().getTime();
    this._definitionChanged = new Cesium.Event();
    this._color = undefined;
    this._colorSubscription = undefined;
    this.color = ob.color;
    this.duration = Cesium.defaultValue(ob.duration, 1000);
    this.count = Cesium.defaultValue(ob.count, 2);
    if (this.count <= 0) {
      this.count = 1;
    }
    this.gradient = Cesium.defaultValue(ob.gradient, 0.1);
    if (this.gradient === 0) {
      this.gradient = 0;
    }
    if (this.gradient > 1) {
      this.gradient = 1;
    }
    this._time = new Date().getTime();
  }

  getType() {
    return 'CircleRippleMaterial';
  }

  getValue(time: any, result: any) {
    if (!Cesium.defined(result)) {
      result = {};
    }
    result.color = getValueOrClonedDefault(
      this._color,
      time,
      Cesium.Color.WHITE,
      result.color,
    );
    result.time =
      ((new Date().getTime() - this._time) % this.duration) / this.duration;
    result.count = this.count;
    result.gradient = 1 + 10 * (1 - this.gradient);
    return result;
  }

  equals(other: any) {
    const reData =
      this === other ||
      (other instanceof CircleRippleMaterialProperty &&
        // @ts-ignore;
        Cesium.Property.equals(this._color, other._color));
    return reData;
  }
}

// @ts-ignore;
Cesium.Material._materialCache.addMaterial('CircleRippleMaterial', {
  fabric: {
    type: 'CircleRippleMaterial',
    uniforms: {
      color: new Cesium.Color(1, 0, 0, 1),
      time: 1,
      count: 1,
      gradient: 0.1,
    },
    source: CircleRippleMaterialSource,
  },
  translucent: function () {
    return true;
  },
});

export { CircleRippleMaterialProperty };
