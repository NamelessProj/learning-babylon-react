import React, { useEffect, useState } from 'react';
import { Scalar } from '@babylonjs/core';
import { GameObjectContext } from '../contexts/GameObjectContext';

// TO SOLVE THE EXERCISE, YOU NEED TO MODIFY THIS COMPONENT
// TO HANDLE THE JUMP KEY TO AVOID PLAYER FLIGHT

const InputController = (props) => {
    const { scene } = React.useContext(GameObjectContext);
    const [inputMap, setInputMap] = useState({});
    const [horizontal, setHorizontal] = useState(0);
    const [vertical, setVertical] = useState(0);
    const [jumpKeyDown, setJumpKeyDown] = useState(false);

    useEffect(() => {
        const onKeyDown = (event) => {
            setInputMap((prevInputMap) => ({
                ...prevInputMap,
                [event.key.toLowerCase()]: true,
            }));

            if (event.key === ' ' && !jumpKeyPressed) {
                setJumpKeyDown(true);
            }
        };
        const onKeyUp = (event) => {
            setInputMap((prevInputMap) => ({
                ...prevInputMap,
                [event.key.toLowerCase()]: false,
            }));
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
        };
    }, [jumpKeyPressed]);

    useEffect(() => {
        const updateFromKeyboard = () => {
            if (inputMap['a']) {
                setHorizontal((prevHorizontal) => Scalar.Lerp(prevHorizontal, -0.1, 0.5));
            } else if (inputMap['d']) {
                setHorizontal((prevHorizontal) => Scalar.Lerp(prevHorizontal, 0.1, 0.5));
            } else {
                setHorizontal(0);
            }
            if (inputMap['w']) {
                  console.log('w');
                setVertical((prevVertical) => Scalar.Lerp(prevVertical, 0.1, 0.5));
            } else if (inputMap['s']) {
                setVertical((prevVertical) => Scalar.Lerp(prevVertical, -0.1, 0.5));
            } else {
                setVertical(0);
            }

            setJumpKeyDown(false);

            // Call the onUpdate prop instead of dispatching a custom event
            props.onUpdate({
                horizontal,
                vertical,
                jumpKeyDown,
            });
        };

        scene.registerBeforeRender(updateFromKeyboard);
        return () => {
            scene.unregisterBeforeRender(updateFromKeyboard);
        };
    }, [scene, inputMap, props.onUpdate, horizontal, vertical, jumpKeyDown]);

    return null;
};

export default InputController;