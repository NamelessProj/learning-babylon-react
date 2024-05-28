// GameObjectContext.jsx
import React from 'react';
import PropTypes from 'prop-types';

// Crea il contesto GameObjectContext
const GameObjectContext = React.createContext({
  scene: null,
  engine: null,
});

// Crea il componente GameObject
const GameObject = ({ children, scene, engine }) => {
  const beforeLoop = React.useCallback(() => {
    // Logica comune prima del rendering
  }, []);

  const afterLoop = React.useCallback(() => {
    // Logica comune dopo il rendering
  }, []);

  React.useEffect(() => {
    scene.registerBeforeRender(beforeLoop);
    scene.registerAfterRender(afterLoop);

    return () => {
      scene.unregisterBeforeRender(beforeLoop);
      scene.unregisterAfterRender(afterLoop);
    };
  }, [scene, beforeLoop, afterLoop]);

  return <GameObjectContext.Provider value={{ scene, engine }}>{children}</GameObjectContext.Provider>;
};

GameObject.propTypes = {
  children: PropTypes.node.isRequired,
  scene: PropTypes.object.isRequired,
  engine: PropTypes.object.isRequired,
};

export { GameObjectContext, GameObject };