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
    const node = new TransformNode("playerNode", scene);
    node.parent = body;
    node.position = new Vector3(0, 0, 1); // Posiziona il nodo in basso rispetto alla sfera

    // Crea un quadratino e assegnalo come figlio del nodo
    const square = MeshBuilder.CreateBox("square", { size: 0.5 }, scene);
    square.parent = node;

    playerRef.current = body;
  };

  useEffect(() => {
    const updatePlayer = () => {
      if (playerRef.current) {
          const { horizontal, vertical, jumpKeyDown } = input;

          // Ottieni il delta time
          const deltaTime = engine.getDeltaTime() / 1000;

          // Inizializza il vettore di direzione del movimento a zero
          const moveDirection = Vector3.Zero();

          // Ruota il player a destra
          if (horizontal > 0) {
              playerRef.current.rotation.y += 0.1;
          }

          // Ruota il player a sinistra
          if (horizontal < 0) {
              playerRef.current.rotation.y -= 0.1;
          }


          // Calcola il vettore frontale del player
          const frontVector = new Vector3(
              Math.sin(playerRef.current.rotation.y),
              0,
              Math.cos(playerRef.current.rotation.y)
          );
          // Calcola il vettore back del player
          const backVector = new Vector3(
              -Math.sin(playerRef.current.rotation.y),
              0,
              -Math.cos(playerRef.current.rotation.y)
          );

          // Muovi il player in avanti
          if (vertical > 0) {
            const scaledDirection = frontVector.scale(vertical * PLAYER_SPEED);
            moveDirection.addInPlace(scaledDirection);
          }

          if (vertical < 0) {
            const scaledDirection = backVector.scale(-vertical * PLAYER_SPEED);
            moveDirection.addInPlace(scaledDirection);
          }


          // Applica il movimento al player
          playerRef.current.moveWithCollisions(moveDirection);

          // Applica la forza di salto se il tasto di salto è premuto (ground at Y ~ 1.05 so buffer at 1.2 = on ground)
          if (jumpKeyDown && playerRef.current.position.y < 1.2) {
            velocityRef.current.y = PLAYER_JUMP_FORCE;
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