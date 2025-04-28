// PlayerController.jsx
import React, { useEffect, useRef, useContext } from 'react';
import { MeshBuilder, TransformNode,StandardMaterial, Vector3, Scalar, Color3 } from '@babylonjs/core';
import { GameObjectContext } from '../contexts/GameObjectContext';
import { GRAVITY, PLAYER_SPEED, PLAYER_JUMP_FORCE, ROTATION_SPEED } from '../settings/const';

export const PlayerController = ({input, onPLayerMeshCreated})=>{
   const { scene } = useContext(GameObjectContext);
   const playerRef = useRef(null);
   const velocity = useRef(new Vector3(0, 0, 0));

   useEffect(()=>{

    const player = MeshBuilder.CreateSphere("player", { diameter : 2 }, scene);
    player.position = new Vector3(0, 2, 0);

    // player material
    const playerMaterial = new StandardMaterial("playerMaterial", scene);
    playerMaterial.diffuseColor = new Color3(0, 0, 10);
    player.material = playerMaterial;

    player.checkCollisions = true;

    const node = new TransformNode("playerNode", scene);
    node.parent = player;
    node.position = new Vector3(0, 0, 1);

    const square = MeshBuilder.CreateBox("square", { size: 0.5 }, scene);
    square.parent = node;
    playerRef.current = player;

    if(onPLayerMeshCreated) onPLayerMeshCreated(player);
   }, [scene]);

   // Manage player movement
   useEffect(()=>{
    if(!scene || !playerRef.current) return;
    console.log("PlayerController: scene is ready");

    const updatePlayerMovement = () => {
        const { horizontal, vertical, jump } = input || { horizontal: 0, vertical: 0, jump: false };

        if(horizontal !==0) playerRef.current.rotation.y += horizontal * ROTATION_SPEED

        if(vertical !== 0){
            const frontVector = new Vector3(
                Math.sin(playerRef.current.rotation.x),
                0,
                Math.cos(playerRef.current.rotation.y)
            );
            const moveDirection = frontVector.scale(vertical * PLAYER_SPEED);
            playerRef.current.position.addInPlace(moveDirection);
        }

        if(jump && playerRef.current.position.y <= 1.2){
            velocity.current.y = PLAYER_JUMP_FORCE;
        }

        const deltaTime = scene.getEngine().getDeltaTime() / 1000;
        const nweVelocityY = velocity.current.y + GRAVITY * deltaTime;
        velocity.current.y = Scalar.Lerp(velocity.current.y, nweVelocityY, 0.1);
        playerRef.current.moveWithCollisions(velocity.current);

    }

    scene.registerBeforeRender(updatePlayerMovement);
    return () => {
        scene.unregisterBeforeRender(updatePlayerMovement);
    };
   }, [scene,input]);


    return null;
}