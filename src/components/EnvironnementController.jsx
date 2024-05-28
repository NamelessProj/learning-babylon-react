// EnvironmentController.jsx
import React, { useEffect } from 'react';
import { MeshBuilder } from '@babylonjs/core';
import { GameObjectContext } from '../contexts/GameObjectContext';

const EnvironmentController = () => {
  const { scene } = React.useContext(GameObjectContext);

  useEffect(() => {
    if (scene) {
      createGround(scene);
    }
  }, [scene]);

  const createGround = (scene) => {
    const ground = MeshBuilder.CreateGround(
      'ground',
      { width: 10, height: 10 },
      scene
    );
  };

  return null;
};

export default EnvironmentController;