// CameraController.jsx
import {useContext, useEffect} from 'react';
import {FollowCamera, Vector3} from '@babylonjs/core';
import { GameObjectContext } from '../contexts/GameObjectContext';

export const CameraController = ({playerMesh}) => {
    const { scene, engine } = useContext(GameObjectContext);

    useEffect(() => {
        if (!scene || !playerMesh) return;

        const existingCamera = scene.getCameraByName("transition_camera");
        if(existingCamera){
            existingCamera.dispose();
        }
        const camera = new FollowCamera("main_camera", new Vector3(0, 5, -20), scene);
        camera.radius = 10;
        camera.heightOffset = 5;
        camera.rotationOffset = 180;
        camera.maxCameraSpeed = 0.1;

        camera.lockedTarget = playerMesh;
        scene.activeCamera = camera;
        camera.attachControl(engine.getRenderingCanvas(), true);

        return () => {
            if (camera) {
                camera.detachControl(engine.getRenderingCanvas());
                camera.dispose();
            }
            const existingCamera = scene.getCameraByName("transition_camera");
            if(existingCamera){
                existingCamera.dispose();
            }
        }
    }, [scene, playerMesh, engine]);

    return null;
}