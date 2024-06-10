// EnvironmentController.jsx
import React, { useEffect } from 'react';
import { MeshBuilder, HemisphericLight, Vector3 } from '@babylonjs/core';
import { GameObjectContext } from '../contexts/GameObjectContext';

const EnvironmentController = () => {
  const { scene } = React.useContext(GameObjectContext);

  const maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0],
    [1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1],
    [1,1,0,0,0,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1],
    [1,1,1,1,0,1,0,0,1,0,1,1,0,0,1,0,1,0,1,1],
    [1,0,0,0,0,0,0,1,1,0,0,1,1,0,1,0,1,0,1,1],
    [1,0,1,1,1,1,1,1,0,0,1,1,1,0,1,0,1,0,0,1],
    [1,1,1,1,1,1,1,0,0,1,0,0,0,0,1,0,1,1,0,1],
    [1,0,0,0,0,1,1,0,1,1,0,1,1,1,1,0,1,1,1,1],
    [1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],
    [1,0,1,0,0,0,1,1,1,0,0,1,1,1,0,1,1,1,0,0],
    [1,0,1,0,1,0,0,0,1,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,1,1,0,1,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,1,1,0,1,1,0,1,0,1,0,0,0,1,0,1],
    [1,0,0,0,1,0,1,0,1,1,0,1,0,1,1,1,1,1,0,1],
    [1,1,1,0,1,0,1,0,1,1,0,1,0,0,0,0,0,0,0,1],
    [1,1,1,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,1],
    [1,1,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1],
    [1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,0,1,1,1],
    [1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1]
  ];

  useEffect(() => {
    if (scene) {
      createGround(scene);
      createMaze(scene)
      createSunlight(scene);
    }
  }, [scene]);

  function createMaze(scene) {
    maze.forEach((rows, z) => rows.forEach((isWall, x) => {
      if (!isWall) return;
      const wall = MeshBuilder.CreateBox("wall", {
        size: 4,
      }, scene);
      wall.position.x = (x * 4) - 38;
      wall.position.z = (z * 4) - 38;
      wall.position.y = 2;
      wall.checkCollisions = true;
    }))
  }

  const createGround = (scene) => {
    const ground = MeshBuilder.CreateGround(
      'ground',
      { width: 80, height: 80 },
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