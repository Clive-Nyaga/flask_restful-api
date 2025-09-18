import { useState } from 'react';
import TrainerList from './components/TrainerList';
import AddTrainer from './components/AddTrainer';
import EditTrainer from './components/EditTrainer';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingTrainer, setEditingTrainer] = useState(null);

  const handleTrainerAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleEdit = (trainer) => {
    setEditingTrainer(trainer);
  };

  const handleTrainerUpdated = () => {
    setEditingTrainer(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleCancelEdit = () => {
    setEditingTrainer(null);
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', color: '#333' }}>Training Management System</h1>
      {!editingTrainer && <AddTrainer onTrainerAdded={handleTrainerAdded} />}
      {editingTrainer && (
        <EditTrainer 
          trainer={editingTrainer} 
          onTrainerUpdated={handleTrainerUpdated}
          onCancel={handleCancelEdit}
        />
      )}
      <TrainerList 
        refreshKey={refreshKey} 
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;