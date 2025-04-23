import React, { useState } from 'react';
import { GameObject } from '../contexts/GameObjectContext';
import {CameraController} from './CameraController';
import {EnvironmentController} from './EnvironnementController';
import {PlayerController} from './PlayerController';
import {InputController} from './InputController';

export const Shell = ({ scene, engine }) => {
  const [inputValues, setInputValues] = useState({
    horizontal: 0,
    vertical: 0,
    jumpKeyDown: false,
  });
  const [playerMesh, setPlayerMesh] = useState(null);

  const handleInputUpdated = (updatedValues) => {
    setInputValues(updatedValues);
  };

  const handlePlayerCreated = (mesh) => {
    setPlayerMesh(mesh);
  };

  return (
    <GameObject scene={scene} engine={engine}>
      <EnvironmentController />
      <PlayerController input={inputValues} onPlayerCreated={handlePlayerCreated} />
      {playerMesh && <CameraController playerMesh={playerMesh} />}
      <InputController onUpdate={handleInputUpdated} />
    </GameObject>
  );
};
