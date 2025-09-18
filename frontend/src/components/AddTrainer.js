import { useState } from 'react';

function AddTrainer({ onTrainerAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    specialization: '',
    phone_number: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/trainers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(() => {
        setFormData({ name: '', bio: '', specialization: '', phone_number: '' });
        onTrainerAdded();
      })
      .catch(err => console.error('Error adding trainer:', err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Add New Trainer</h2>
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
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
          Add Trainer
        </button>
      </form>
    </div>
  );
}

export default AddTrainer;