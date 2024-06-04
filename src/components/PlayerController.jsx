// PlayerController.jsx
import React, { useEffect, useRef, useContext } from 'react';
import { MeshBuilder, TransformNode, Vector3, Scalar } from '@babylonjs/core';
import { GameObjectContext } from '../contexts/GameObjectContext';
import { GRAVITY, PLAYER_SPEED, PLAYER_JUMP_FORCE } from '../settings/const';

const PlayerController = ({ input = {} }) => {
  const { scene, engine, beforeLoop } = useContext(GameObjectContext);
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
    body.position = new Vector3(0, 40, 0); // Posiziona il player a un'altezza iniziale
    body.checkCollisions = true;
    body.isPickable = false;
    body.ellipsoid = new Vector3(1, 1, 1);
    body.ellipsoidOffset = new Vector3(0, 0, 0);
    playerRef.current = body;
  };

  useEffect(() => {
    const updatePlayer = () => {
      if (playerRef.current) {
        const { horizontal = 0, vertical = 0, jumpKeyDown = false } = input;

        // Update the player's horizontal velocity based on the input
        velocityRef.current.x = horizontal * PLAYER_SPEED;

        // Update the player's vertical velocity based on the input
        velocityRef.current.z = -vertical * PLAYER_SPEED;

        // Apply the jump force if the player is on the ground
        if (jumpKeyDown && playerRef.current.position.y === 0) {
          velocityRef.current.y = PLAYER_JUMP_FORCE;
        }

        const newVelocityY = velocityRef.current.y + GRAVITY * engine.getDeltaTime() / 1000;
        velocityRef.current.y = Scalar.Lerp(velocityRef.current.y, newVelocityY, 0.1);
        playerRef.current.moveWithCollisions(velocityRef.current);
      }
    };

    beforeLoop.current = updatePlayer;

    return () => {
      beforeLoop.current = null;
    };
  }, [engine, beforeLoop, input]);

  return null;
};

export default PlayerController;