// GameObjectContext.jsx
import React from 'react';
import PropTypes from 'prop-types';

// Crea il contesto GameObjectContext


// Crea il componente GameObject
const GameObject = ({ children, scene, engine }) => {
  const beforeLoopRef = React.useRef(null);
  const afterLoopRef = React.useRef(null);

  React.useEffect(() => {
    const beforeLoop = () => {
      if (beforeLoopRef.current) {
        beforeLoopRef.current();
      }
    };

    const afterLoop = () => {
      if (afterLoopRef.current) {
        afterLoopRef.current();
      }
    };

    scene.registerBeforeRender(beforeLoop);
    scene.registerAfterRender(afterLoop);

    return () => {
      scene.unregisterBeforeRender(beforeLoop);
      scene.unregisterAfterRender(afterLoop);
    };
  }, [scene]);

  return (
    <GameObjectContext.Provider value={{ scene, engine, beforeLoop: beforeLoopRef, afterLoop: afterLoopRef }}>
      {children}
    </GameObjectContext.Provider>
  );
};

GameObject.propTypes = {
  children: PropTypes.node.isRequired,
  scene: PropTypes.object.isRequired,
  engine: PropTypes.object.isRequired,
};

export { GameObjectContext, GameObject };