# Project Title

This is a React project that uses Babylon.js for 3D rendering in the browser. The project is set up with Vite for a faster and leaner development experience.

## Project Structure

The project is structured as follows:

- `src/App.jsx`: This is the main component of the application. It renders the `SceneComponent` and `Shell` components.
- `src/components/`: This directory contains all the components used in the application. These include `CameraController.jsx`, `EnvironnementController.jsx`, `InputController.jsx`, `PlayerController.jsx`, `SceneComponent.jsx`, and `Shell.jsx`.
- `src/contexts/GameObject.contex.js`: This file exports the `GameObject` and `GameObjectContext` components. The `GameObject` component provides common logic before and after rendering.
- `src/main.jsx`: This is the entry point of the application. It renders the `App` component into the root div in `index.html`.

## Installation

To install the project, run the following command:

```sh
npm install