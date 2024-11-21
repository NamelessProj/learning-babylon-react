// App.jsx
import React, {useState, useCallback, useEffect} from 'react';
import { SceneComponent } from './components/SceneComponent';
import {ArcRotateCamera, FollowCamera, Vector3} from '@babylonjs/core';
import Shell from './components/Shell';
import './App.css';
import playerController from "./components/PlayerController.jsx";

const App = () => {
  const [sceneState, setSceneState] = useState(null);
  const [engineState, setEngineState] = useState(null);

  const onSceneReady = useCallback((scene) => {
    const engine = scene.getEngine();
    setSceneState(scene);
    setEngineState(engine);
    console.log('Scene is ready');

    // //Check if player exist to create camera
    //
    // const [playerReady, setPlayerReady] = useState(false)
    //
    // useEffect(() => {
    //   let interval
    //
    //   if (scene){
    //     interval = setInterval(() => {
    //       const player = scene.getMeshByName('player')
    //       if (player){
    //         setPlayerReady(true)
    //         clearInterval(interval)
    //       }
    //     }, 100)
    //   }
    //
    // }, [scene])
    //
    // useEffect(() => {
    //   const camera = new FollowCamera(
    //       'camera',
    //       new Vector3(0, 5, -15),
    //       scene
    //   )
    //   camera.radius = 30
    //   camera.lockedTarget = scene.getMeshByName('player')
    //   console.log(camera.lockedTarget)
    // }, [scene, playerReady])

    const camera = new ArcRotateCamera(
      'camera',
      Math.PI / 2,
      Math.PI / 2,
      2,
      new Vector3(0, 5, -20),
      scene
    );
    camera.setTarget(Vector3.Zero());
    camera.attachControl(scene.getEngine().getRenderingCanvas(), true);

  }, []);

  const onRender = useCallback((scene) => {
    // Logica di rendering
  }, []);

  return (
    <SceneComponent
      antialias
      onSceneReady={onSceneReady}
      onRender={onRender}
      id="my-canvas"
      id="my-canvas"
    >
      {sceneState && engineState && (
        <Shell scene={sceneState} engine={engineState} />
      )}
      {sceneState && engineState && (
        <Shell scene={sceneState} engine={engineState} />
      )}
    </SceneComponent>
  );
};

export default App;