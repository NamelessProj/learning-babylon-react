// Shell.jsx
import { GameObjectContext, GameObject } from '../contexts/GameObjectContext';
import CameraController from './CameraController';
import EnvironmentController from './EnvironnementController';

const Shell = ({ scene, engine }) => {
  return (
    <GameObjectContext.Provider value={{ scene, engine }}>
      <GameObject scene={scene} engine={engine}>
        <CameraController />
        <EnvironmentController />
      </GameObject>
    </GameObjectContext.Provider>
  );
};

export default Shell;