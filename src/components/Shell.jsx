import React, { useState } from 'react';
import { GameObject } from '../contexts/GameObjectContext';
import {EnvironmentController} from './EnvironnementController';
import {PlayerController} from './PlayerController';
import {InputController} from './InputController';
import {CameraController} from "./CameraController";

export const Shell = ({ scene, engine }) => {
    const [playerMesh, setPlayerMesh] = useState(null);
  const [input, setInput] = useState({
    horizontal: 0,
    vertical: 0,
  });

  const onInputUpdated = (values) => {
    setInput(values)
  }

  const onPLayerMeshCreated = (mesh) => {
    setPlayerMesh(mesh);
  }

  return (
    <GameObject scene={scene} engine={engine}>
      <EnvironmentController />
      <PlayerController input={input} onPLayerMeshCreated={onPLayerMeshCreated} />
       {playerMesh && <CameraController playerMesh={playerMesh} />}
      <InputController onInputUpdated={onInputUpdated } />
    </GameObject>
  );
};
