import React, { Component } from 'react';
import './App.scss';
import GUI from './GUI';
import {Vector3} from "three";
import WorldMap from "./components/WorldMap";
import {TileMap} from "./utils/mapTypes";
import MeshLoader from "./assets/MeshLoader";

const THREE = require('three');
const ReactTHREE = require('react-three');
const OrbitControls = require('three-orbit-controls')(THREE);
const [Renderer, Scene, PerspectiveCamera, HemisphereLight, DirectionalLight] = [ReactTHREE.Renderer, ReactTHREE.Scene, ReactTHREE.PerspectiveCamera, ReactTHREE.HemisphereLight, ReactTHREE.DirectionalLight];

class App extends Component<any, any> {

  static controls: any;
  map: TileMap;
  meshLoader: MeshLoader;

  constructor(props: Object) {
    super(props);
    App.controls = null;
    this.state = {
      width: 0,
      height: 0,
      loadingProgress: 0
    };
    this.map = {
      "0,0": {
        type: "hall",
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
    this.meshLoader = MeshLoader.getInstance();
    this.meshLoader.onProgress((i: number) => {
      this.setState({loadingProgress: i})
    });
    // @ts-ignore
    window.THREE = THREE;
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

  onDirLightMounted(dirLight: THREE.DirectionalLight) {
    // @ts-ignore
    window.dirLight = dirLight;
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    var d = 50;
    dirLight.shadow.camera.left = - d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = - d;
    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = - 0.0001;
  }

  static _onCameraMounted(camera: THREE.PerspectiveCamera) {
    camera.up.set(0, 0, 1);
    App.controls = new OrbitControls(camera);
    App.controls.target = new Vector3(0, 0, 0);
    App.controls.maxDistance = 200;
    App.controls.minDistance = 100;
    App.controls.mouseButtons = { ORBIT: THREE.MOUSE.MIDDLE, ZOOM: null, PAN: THREE.MOUSE.LEFT }
  }

  static _onSceneMounted(scene: THREE.Scene) {
    // @ts-ignore
    window.scene = scene;
    let h = new THREE.HemisphereLight(0x327aff, 0xffc77f, 0.6);
    scene.add(h);
  }

  static _onRendererMounted(renderer: THREE.Renderer) {
    // @ts-ignore
    window.renderer = renderer;
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

    if (!this.meshLoader.isLoaded())
      return <p>Loading assets {this.state.loadingProgress}/{this.meshLoader.loadingTotal}</p>;

    return (
        <div>
          <GUI/>
          <Renderer width={this.state.width} height={this.state.height} background={0x2d2c5b} shadowMapEnabled={true} shadowMapType={THREE.PCFSoftShadowMap} ref={App._onRendererMounted}>
            <Scene ref={App._onSceneMounted} width={this.state.width} height={this.state.height} camera="main-camera">
              <PerspectiveCamera ref={App._onCameraMounted} name="main-camera" {...cameraProps} />
              <DirectionalLight color={0xfff5e8} position={(new Vector3(0.1, 0.2, 0.95)).multiplyScalar(30)} intensity={1} ref={this.onDirLightMounted}/>
              {/*<ReactTHREE.PointLight color={0xff0000} intensity={0.6} position={new Vector3(20, 20, 20)} castShadow={true}/>*/}
              <WorldMap map={this.map}/>
            </Scene>
          </Renderer>
        </div>
    );
  }
}

export default App;
