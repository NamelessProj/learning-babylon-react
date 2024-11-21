// CameraController.jsx
import { useContext, useEffect, useState } from 'react';
import { ArcRotateCamera, Vector3, FollowCamera } from '@babylonjs/core';
import { GameObjectContext } from '../contexts/GameObjectContext';

const CameraController = () => {
  const { scene, engine, beforeLoop } = useContext(GameObjectContext);
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    if (scene) {
      const arcCamera = new ArcRotateCamera('arcCamera', -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0), scene);
      arcCamera.attachControl(scene.getEngine().getRenderingCanvas(), true);
    }
  }, [scene]);

  useEffect(() => {
    let interval;

    if (scene) {
      interval = setInterval(() => {
        const player = scene.getMeshByName("player");
        if (player) {
          setPlayerReady(true);
          clearInterval(interval);
        }
      }, 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [scene]);

  useEffect(() => {
    if (scene && playerReady) {
      const arcCamera = scene.getCameraByName('arcCamera');
      if (arcCamera) {
        arcCamera.dispose();
      }

      const player = scene.getMeshByName("player");
      if (player) {
        const followCamera = new FollowCamera("FollowCamera", new Vector3(10, 0, 10), scene);
        followCamera.radius = 20;
        followCamera.heightOffset = 2;
        followCamera.rotationOffset = 180;
        followCamera.cameraAcceleration = 0.2;
        followCamera.maxCameraSpeed = 10;
        followCamera.lockedTarget = player;

        scene.activeCamera = followCamera;
        followCamera.attachControl();

        followCamera.dampingFactorX = 0.1;
      followCamera.dampingFactorY = 0.1;
      followCamera.dampingFactorZ = 0.1;
      }
    }
  }, [scene, playerReady]);

  return null;
};

export default CameraController;