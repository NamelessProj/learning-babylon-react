// CameraController.jsx
import {useContext, useEffect} from 'react';
import {FollowCamera, Vector3} from '@babylonjs/core';
import { GameObjectContext } from '../contexts/GameObjectContext';

export const CameraController = ({ playerMesh }) => {
  const { scene } = useContext(GameObjectContext);

  useEffect(() => {
    if (scene && playerMesh) {
      const existingCamera = scene.getCameraByName('camera');
      if (existingCamera) existingCamera.dispose();


      const camera = new FollowCamera(
        'camera',
        new Vector3(0, 5, -15),
        scene
      );
      camera.radius = 30;
      camera.heightOffset = 25;
      camera.rotationOffset = 180;
      camera.lockedTarget = playerMesh;
      console.log("Camera target:", camera.lockedTarget);
    }
  }, [scene, playerMesh]);

  return null;
};