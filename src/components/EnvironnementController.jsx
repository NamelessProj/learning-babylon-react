// EnvironmentController.jsx
import React, { useEffect } from 'react';
import { MeshBuilder, HemisphericLight, Vector3, StandardMaterial, Texture } from '@babylonjs/core';
import { GameObjectContext } from '../contexts/GameObjectContext';

const EnvironmentController = () => {
  const { scene } = React.useContext(GameObjectContext);

  useEffect(() => {
    if (scene) {
      createGround(scene);
      createSunlight(scene);
      createMaze(scene);
    }
  }, [scene]);

  const createGround = (scene) => {
    const ground = MeshBuilder.CreateGround(
      'ground',
      { width: 400, height: 400,},
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

  const createMaze = (scene) => {
    const maze = [
      [1, 0, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 1],
    ];

    const platformWidth = 400;
    const platformHeight = 400;
    const rows = maze.length;
    const cols = maze[0].length;

    const cellWidth = platformWidth / cols;
    const cellHeight = 40;
    const cellDepth = platformHeight / rows;

    const wallMaterial = new StandardMaterial('wallMaterial', scene);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (maze[i][j] === 1) {
          const wall = MeshBuilder.CreateBox(
            `wall-${i}-${j}`,
            { width: cellWidth, height: cellHeight, depth: cellDepth },
            scene
          );
          wall.position.x = (j - cols / 2) * cellWidth + cellWidth / 2;
          wall.position.z = (i - rows / 2) * cellDepth + cellDepth / 2;
          wall.position.y = cellHeight / 2;
          wall.material = wallMaterial;
          wall.checkCollisions = true;
        }
      }
    }
  };

  return null;
};

export default EnvironmentController;