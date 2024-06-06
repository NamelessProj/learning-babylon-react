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

    // Add a child node to the player
    const node = new TransformNode("playerNode", scene);
    node.parent = body;
    node.position = new Vector3(0, 0, 1);

    // Create a square mesh add it as a child of the player
    const square = MeshBuilder.CreateBox("square", { size: 0.5 }, scene);
    square.parent = node;

    playerRef.current = body;
    playerRef.current = body;
  };

  useEffect(() => {
    const updatePlayer = () => {
      if (playerRef.current) {
          const { horizontal, vertical, jumpKeyDown } = input;

          // Get the time delta
          const deltaTime = engine.getDeltaTime() / 1000;

          // Initialize the movement direction to zero
          const moveDirection = Vector3.Zero();


          if (horizontal > 0) {
              playerRef.current.rotation.y += 0.1;
          }


          if (horizontal < 0) {
              playerRef.current.rotation.y -= 0.1;
          }

          // Calculate the front vector of the player
          const frontVector = new Vector3(
              Math.sin(playerRef.current.rotation.y),
              0,
              Math.cos(playerRef.current.rotation.y)
          );

          // Calculate the back vector of the player
          const backVector = frontVector.negate();

          // Muovi il player in avanti
          if (vertical > 0) {
              moveDirection.copyFrom(frontVector).multiplyByFloats(
                  PLAYER_SPEED,
                  PLAYER_SPEED,
                  PLAYER_SPEED
              );
          }

          if (vertical < 0) {
              moveDirection.copyFrom(backVector).multiplyByFloats(
                  PLAYER_SPEED,
                  PLAYER_SPEED,
                  PLAYER_SPEED
              );
          }


          // Apply the movement direction to the player
          playerRef.current.moveWithCollisions(moveDirection);

          console.log(playerRef.current.position);

          // Apply gravity and jump
          if (jumpKeyDown) {
              velocityRef.current.y = PLAYER_JUMP_FORCE;
          }else{
            velocityRef.current.y += GRAVITY * deltaTime;
          }

          const newVelocityY = velocityRef.current.y + GRAVITY * deltaTime;
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