import { useState } from 'react';
import TrainerList from './components/TrainerList';
import AddTrainer from './components/AddTrainer';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTrainerAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', color: '#333' }}>Training Management System</h1>
      <AddTrainer onTrainerAdded={handleTrainerAdded} />
      <TrainerList key={refreshKey} />
    </div>
  );
}

export default App;