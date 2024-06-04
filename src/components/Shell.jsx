// Shell.jsx
import React, { useEffect, useState } from 'react';
import { GameObject } from '../contexts/GameObjectContext';
import CameraController from './CameraController';
import EnvironmentController from './EnvironnementController';
import PlayerController from './PlayerController';
import InputController from './InputController';

const Shell = ({ scene, engine }) => {
  const [inputValues, setInputValues] = useState({
    horizontal: 0,
    vertical: 0,
    jumpKeyDown: false,
  });

  const handleInputUpdated = (updatedValues) => {
    setInputValues(updatedValues);
  };

  return (
    <GameObject scene={scene} engine={engine}>
      <CameraController />
      <EnvironmentController />
      <PlayerController input={inputValues} />
      <InputController onUpdate={handleInputUpdated} />
    </GameObject>
  );
};

export default Shell;