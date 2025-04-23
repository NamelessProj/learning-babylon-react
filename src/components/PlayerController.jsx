// PlayerController.jsx
import React, { useEffect, useRef, useContext } from 'react';
import { MeshBuilder, TransformNode, Vector3, Scalar } from '@babylonjs/core';
import { GameObjectContext } from '../contexts/GameObjectContext';
import { GRAVITY, PLAYER_SPEED, PLAYER_JUMP_FORCE, ROTATION_SPEED } from '../settings/const';

/**
 * PlayerController component handles the creation and control of the player character.
 * It manages player movement, rotation, jumping, and collision detection.
 *
 * @param {Object} props - Component props
 * @param {Object} props.input - Input values for controlling the player
 * @param {number} props.input.horizontal - Horizontal input value (-1 to 1)
 * @param {number} props.input.vertical - Vertical input value (-1 to 1)
 * @param {boolean} props.input.jumpKeyDown - Whether the jump key is pressed
 * @param {Function} [props.onPlayerCreated] - Callback function called when player is created, receives the player mesh
 * @returns {null} This component does not render any visible elements
 */
export const PlayerController = ({ input = {}, onPlayerCreated }) => {
  const { scene, engine, beforeLoop } = useContext(GameObjectContext);
  const playerRef = useRef(null);
  const velocityRef = useRef(Vector3.Zero());

  /**
   * Effect to create the player when the scene is ready
   */
  useEffect(() => {
    if (scene) {
      console.log('Player is ready');
      createPlayer(scene);
    }
  }, [scene]);

  /**
   * Creates the player mesh and its associated components
   *
   * @param {BABYLON.Scene} scene - The Babylon.js scene
   */
  const createPlayer = (scene) => {
    // Create the main body sphere
    const body = MeshBuilder.CreateSphere("player", { diameter: 2 }, scene);
    body.position = new Vector3(0, 40, 0); // Position player at initial height
    body.checkCollisions = true; // Enable collision detection
    body.isPickable = false; // Prevent picking interactions

    // Configure collision detection
    body.ellipsoid = new Vector3(1, 1, 1);
    body.ellipsoidOffset = new Vector3(0, 0, 0);

    // Create a transform node for attaching child objects
    const node = new TransformNode("playerNode", scene);
    node.parent = body;
    node.position = new Vector3(0, 0, 1); // Position node below the sphere

    // Create a direction indicator
    const square = MeshBuilder.CreateBox("square", { size: 0.5 }, scene);
    square.parent = node;

    // Store reference to the player body
    playerRef.current = body;

    // Call the callback if provided
    if (onPlayerCreated) {
      onPlayerCreated(body);
    }
  };

  /**
   * Effect to set up the player update loop
   */
  useEffect(() => {
    /**
     * Updates the player on each frame
     * Handles rotation, movement, jumping, and gravity
     */
    const updatePlayer = () => {
      if (playerRef.current) {
        const { horizontal, vertical, jumpKeyDown } = input;

        // Get delta time for frame-rate independent movement
        const deltaTime = engine.getDeltaTime() / 1000;

        // Initialize movement direction vector
        const moveDirection = Vector3.Zero();

        // --- ROTATION HANDLING ---
        // Rotate player based on horizontal input
        if (horizontal > 0) {
          playerRef.current.rotation.y += ROTATION_SPEED;
        }
        if (horizontal < 0) {
          playerRef.current.rotation.y -= ROTATION_SPEED;
        }

        // --- MOVEMENT VECTORS ---
        // Calculate forward and backward vectors based on player's current rotation
        const frontVector = new Vector3(
          Math.sin(playerRef.current.rotation.y),
          0,
          Math.cos(playerRef.current.rotation.y)
        );

        const backVector = new Vector3(
          -Math.sin(playerRef.current.rotation.y),
          0,
          -Math.cos(playerRef.current.rotation.y)
        );

        // --- FORWARD/BACKWARD MOVEMENT ---
        // Apply movement in the appropriate direction based on vertical input
        if (vertical > 0) {
          const scaledDirection = frontVector.scale(vertical * PLAYER_SPEED);
          moveDirection.addInPlace(scaledDirection);
        }
        if (vertical < 0) {
          const scaledDirection = backVector.scale(-vertical * PLAYER_SPEED);
          moveDirection.addInPlace(scaledDirection);
        }

        // Apply horizontal/vertical movement with collision detection
        playerRef.current.moveWithCollisions(moveDirection);

        // --- JUMPING AND GRAVITY ---
        // Check if player is on ground (using a small buffer of 1.2 units)
        // Apply jump force if jump key is pressed and player is on ground
        if (jumpKeyDown && playerRef.current.position.y < 1.2) {
          velocityRef.current.y = PLAYER_JUMP_FORCE;
        }

        // Apply gravity to vertical velocity
        const newVelocityY = velocityRef.current.y + GRAVITY * deltaTime;
        velocityRef.current.y = Scalar.Lerp(velocityRef.current.y, newVelocityY, 0.1);

        // Apply vertical movement with collision detection
        playerRef.current.moveWithCollisions(velocityRef.current);
      }
    };

    // Register the update function to run before each frame
    beforeLoop.current = updatePlayer;

    // Cleanup function to remove the update when component unmounts
    return () => {
      beforeLoop.current = null;
    };
  }, [engine, beforeLoop, input, onPlayerCreated]);

  // This component doesn't render anything visible
  return null;
};

