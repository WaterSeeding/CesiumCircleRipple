import "./app.css";
import * as dat from "dat.gui";
import { viewer } from "./main";
import Camera from "./Camera/index";
import CircleRipple from './CircleRippleMaterial/common/CircleRipple';

const gui = new dat.GUI({
  name: "Cesium GUI",
  width: 450,
  autoPlace: true,
  closed: false,
});
gui.domElement.id = "gui";
gui.show();

let camera = new Camera(
  viewer,
  gui,
  {
    position: {
      longitude: 114.033629,
      latitude: 22.505773,
      height: 11286,
    },
    headingPitchRoll: {
      heading: 0,
      pitch: -90,
      roll: 0,
    },
  },
  true,
);

let circleWave = new CircleRipple(viewer, 'circleRipple');
circleWave.add(
  [114.04821657959855, 22.508607376269367, 10],
  'green',
  1000,
  3000,
);
