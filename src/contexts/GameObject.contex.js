// GameObject.js
import React from 'react';
import PropTypes from 'prop-types';

const GameObjectContext = React.createContext();

const GameObject = ({ children }) => {
  const { scene } = React.useContext(GameObjectContext);

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

  return (
    <GameObjectContext.Consumer>
      {(context) => {
        const { gameController, scene, engine, level } = context;
        return children({ gameController, scene, engine, level });
      }}
    </GameObjectContext.Consumer>
  );
};

GameObject.propTypes = {
    children: PropTypes.func.isRequired,
  };

export { GameObject, GameObjectContext };