// CameraController.jsx
import { useContext, useEffect } from 'react';
import { ArcRotateCamera, Vector3 } from '@babylonjs/core';
import { GameObjectContext } from '../contexts/GameObjectContext';

const CameraController = () => {
  const { scene } = useContext(GameObjectContext);
  useEffect(() => {
    if (scene) {
      const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 15, new Vector3(0, 0, 0), scene);
      camera.attachControl(scene.getEngine().getRenderingCanvas(), true);
    }
  }, [scene]);

  return null;
};

export default CameraController;