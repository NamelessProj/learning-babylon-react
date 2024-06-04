// Shell.jsx
import React, { useEffect } from 'react';
import { GameObjectContext, GameObject } from '../contexts/GameObjectContext';
import CameraController from './CameraController';
import EnvironmentController from './EnvironnementController';
import PlayerController from './PlayerController';

const Shell = ({ scene, engine }) => {
  useEffect(() => {
    if (scene) {
      scene.collisionsEnabled = true; // Aggiungi questa riga
    }
  }, [scene]);

  return (
    <GameObjectContext.Provider value={{ scene, engine }}>
      <GameObject scene={scene} engine={engine}>
        <CameraController />
        <EnvironmentController />
        <PlayerController />
      </GameObject>
    </GameObjectContext.Provider>
  );
};

export default Shell;