// App.jsx
import { SceneComponent } from './components/SceneComponent';
import Shell from './components/Shell';
import './App.css';

const App = () => {
  const onSceneReady = (scene) => {
    // Qui puoi eseguire altre operazioni di configurazione della scena, se necessario
  };

  const onRender = (scene) => {
    // Qui puoi eseguire operazioni di rendering personalizzate, se necessario
  };

  return (
    <SceneComponent
      antialias
      onSceneReady={onSceneReady}
      onRender={onRender}
    >
      <Shell />
    </SceneComponent>
  );
};

export default App;