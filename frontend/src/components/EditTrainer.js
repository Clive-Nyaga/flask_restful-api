import { useState, useEffect } from 'react';

function EditTrainer({ trainer, onTrainerUpdated, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    specialization: '',
    phone_number: ''
  });

  useEffect(() => {
    if (trainer) {
      setFormData({
        name: trainer.name,
        bio: trainer.bio,
        specialization: trainer.specialization,
        phone_number: trainer.phone_number
      });
    }
  }, [trainer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/get_trainer_by_id/${trainer.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(() => {
        onTrainerUpdated();
      })
      .catch(err => console.error('Error updating trainer:', err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!trainer) return null;

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', backgroundColor: '#fff3cd' }}>
      <h2>Edit Trainer</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', height: '60px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="">Select Specialization</option>
            <option value="Yoga">Yoga</option>
            <option value="Cardio">Cardio</option>
            <option value="Strength">Strength</option>
            <option value="Boxing">Boxing</option>
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div>
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', marginRight: '10px' }}>
            Update Trainer
          </button>
          <button type="button" onClick={onCancel} style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTrainer;