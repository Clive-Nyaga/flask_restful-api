import { useState, useEffect } from 'react';

function TrainerList({ refreshKey, onEdit }) {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/trainers')
      .then(response => response.json())
      .then(data => setTrainers(data))
      .catch(err => console.error('Error fetching trainers:', err));
  }, [refreshKey]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this trainer?')) {
      fetch(`http://localhost:5000/get_trainer_by_id/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          setTrainers(trainers.filter(trainer => trainer.id !== id));
        })
        .catch(err => console.error('Error deleting trainer:', err));
    }
  };

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Trainers</h2>
      {trainers.length === 0 ? (
        <p>No trainers found</p>
      ) : (
        trainers.map(trainer => (
          <div key={trainer.id} style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f5f5f5' }}>
            <h3>{trainer.name}</h3>
            <p><strong>Specialization:</strong> {trainer.specialization}</p>
            <p><strong>Bio:</strong> {trainer.bio}</p>
            <p><strong>Phone:</strong> {trainer.phone_number}</p>
            <div style={{ marginTop: '10px' }}>
              <button 
                onClick={() => onEdit(trainer)}
                style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', marginRight: '10px' }}
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(trainer.id)}
                style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TrainerList;