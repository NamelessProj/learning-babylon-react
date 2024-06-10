// CameraController.jsx
import {useContext, useEffect, useState} from 'react';
import {ArcRotateCamera, FollowCamera, Vector3} from '@babylonjs/core';
import { GameObjectContext } from '../contexts/GameObjectContext';
import playerController from "./PlayerController.jsx";

const CameraController = () => {
  const { scene } = useContext(GameObjectContext);
  //Check if player exist to create camera

  const [playerReady, setPlayerReady] = useState(false)

  useEffect(() => {
    let interval

    if (scene){
      interval = setInterval(() => {
        const player = scene.getMeshByName('player')
        if (player){
          setPlayerReady(true)
          clearInterval(interval)
        }
      }, 100)
    }

  }, [scene])

  useEffect(() => {
    scene.getCameraByName('camera').dispose()
    const camera = new FollowCamera(
        'camera',
        new Vector3(0, 5, -15),
        scene
    )
    camera.radius = 30
    camera.heightOffset = 10
    camera.rotationOffset = 180
    camera.lockedTarget = scene.getMeshByName('player')
    console.log(camera.lockedTarget)
  }, [scene, playerReady])

  return null;
};

export default CameraController;