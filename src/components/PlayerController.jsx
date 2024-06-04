// PlayerController.jsx
import React, { useEffect, useRef } from 'react';
import { MeshBuilder, TransformNode, Vector3 } from '@babylonjs/core';
import { GameObjectContext } from '../contexts/GameObjectContext';
import { GRAVITY, PLAYER_SPEED, PLAYER_JUMP_FORCE } from '../settings/const';

const PlayerController = () => {
  const { scene } = React.useContext(GameObjectContext);
  const playerRef = useRef(null);
  const velocityRef = useRef(Vector3.Zero());

  useEffect(() => {
    if (scene) {
      console.log('Player is ready');
      createPlayer(scene);
    }
  }, [scene]);

  const createPlayer = (scene) => {
    const body = MeshBuilder.CreateSphere("player", { diameter: 2 }, scene);
    body.position = new Vector3(0, 5, 0); // Posiziona il player a un'altezza iniziale
    body.checkCollisions = true;
    body.isPickable = false;
    body.ellipsoid = new Vector3(1, 1, 1);
    body.ellipsoidOffset = new Vector3(0, 0, 0);
    playerRef.current = body;
  };

  useEffect(() => {
    const updatePlayer = () => {
      if (playerRef.current) {
        // Applica la gravità alla velocità del player
        velocityRef.current.y += GRAVITY * scene.getEngine().getDeltaTime() / 1000;

        // Aggiorna la posizione del player in base alla velocità
        playerRef.current.moveWithCollisions(velocityRef.current);
      }
    };

    scene.registerBeforeRender(updatePlayer);

    return () => {
      scene.unregisterBeforeRender(updatePlayer);
    };
  }, [scene]);

  return null;
};

export default PlayerController;