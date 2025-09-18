import { useState, useEffect } from 'react';

function TrainerList() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/trainers')
      .then(response => response.json())
      .then(data => setTrainers(data))
      .catch(err => console.error('Error fetching trainers:', err));
  }, []);

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
          </div>
        ))
      )}
    </div>
  );
}

export default TrainerList;