// EnvironmentController.jsx
import React, { useEffect } from 'react';
import { MeshBuilder, HemisphericLight, Vector3 } from '@babylonjs/core';
import { GameObjectContext } from '../contexts/GameObjectContext';

const EnvironmentController = () => {
  const { scene } = React.useContext(GameObjectContext);

  useEffect(() => {
    if (scene) {
      createGround(scene);
    createSunlight(scene);
    }
  }, [scene]);

  const createGround = (scene) => {
    const ground = MeshBuilder.CreateGround(
      'ground',
      { width: 10, height: 10 },
      scene
    );
    ground.checkCollisions = true;
  };

  const createSunlight = (scene) => {
    const sunlight = new HemisphericLight(
      'sunlight',
      new Vector3(0, 1, 0),
      scene
    );
    sunlight.intensity = 0.7;
  };

  return null;
};

export default EnvironmentController;