import React, { Component } from 'react';
import './App.scss';
import GUI from './GUI';
import Tile from "./components/Tile";
import {Vector3} from "three";
import {instanceOf} from "prop-types";
import WorldMap from "./components/WorldMap";
import {TileMap} from "./utils/mapTypes";

const THREE = require('three');
const ReactTHREE = require('react-three');
const OrbitControls = require('three-orbit-controls')(THREE);
const [Renderer, Scene, PerspectiveCamera, PointLight] = [ReactTHREE.Renderer, ReactTHREE.Scene, ReactTHREE.PerspectiveCamera, ReactTHREE.PointLight];

class App extends Component<{}, any> {

  static controls: any;
  map: TileMap;

  constructor(props: Object) {
    super(props);
    App.controls = null;
    this.state = {
      width: 0,
      height: 0
    };
    this.map = {
      "0,0": {
        type: "empty",
        height: 2
      },
      "0,1": {
        type: "empty",
        height: 3
      },
      "0,2": {
        type: "empty",
        height: 3
      },
      "-1,2": {
        type: "empty",
        height: 3
      },
      "1,0": {
        type: "void"
      },
      "1,1": {
        type: "pool",
        height: 1
      }
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount(): void {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount(): void {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  static _onCameraMounted(camera: THREE.PerspectiveCamera) {
    camera.up.set(0, 0, 1);
    App.controls = new OrbitControls(camera);
    App.controls.target = new Vector3(0, 0, 0);
    App.controls.mouseButtons = { ORBIT: THREE.MOUSE.MIDDLE, ZOOM: null, PAN: THREE.MOUSE.LEFT }
  }

  render() {
    let aspect = this.state.width / this.state.height;
    let cameraProps = {
      fov: 75,
      aspect,
      near: 1,
      far: 5000,
      position: new THREE.Vector3(0, -100, 50),
      lookat: new THREE.Vector3(0, 0, 0)
    };

    return (
        <div>
          <GUI/>
          <Renderer width={this.state.width} height={this.state.height}>
            <Scene width={this.state.width} height={this.state.height} camera="main-camera">
              <PerspectiveCamera ref={App._onCameraMounted} name="main-camera" {...cameraProps} />
              <PointLight color={0xffffff} intensity={1} distance={0} position={new Vector3(0, 200, 0)}/>
              <PointLight color={0xffffff} intensity={1} distance={0} position={new Vector3(100, 200, 100)}/>
              <PointLight color={0xffffff} intensity={1} distance={0} position={new Vector3(-100, -200, -100)}/>
              <WorldMap map={this.map}/>
            </Scene>
          </Renderer>
        </div>
    );
  }
}

export default App;
