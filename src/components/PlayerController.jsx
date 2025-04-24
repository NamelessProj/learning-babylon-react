// PlayerController.jsx
import React, { useEffect, useRef, useContext } from 'react';
import { MeshBuilder, TransformNode, Vector3, Scalar } from '@babylonjs/core';
import { GameObjectContext } from '../contexts/GameObjectContext';
import { GRAVITY, PLAYER_SPEED, PLAYER_JUMP_FORCE, ROTATION_SPEED } from '../settings/const';

