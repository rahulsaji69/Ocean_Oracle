import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    shipmentType: '',
    containerType: '',
    containerCount: 1,
    cargoWeight: '',
    cargoDescription: '',
    originPort: '',
    destinationPort: '',
    departureDate: '',
    arrivalDate: '',
    companyName: '',
    contactName: '',
    phoneNumber: '',
    email: '',
    additionalServices: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedServices = checked
        ? [...formData.additionalServices, name]
        : formData.additionalServices.filter(service => service !== name);
      setFormData({ ...formData, additionalServices: updatedServices });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking Data Submitted: ', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2>Book a Vessel</h2>
      
      <div className="form-section">
        <h3>Shipment Details</h3>
        <div className="form-group">
          <label>Shipment Type</label>
          <select name="shipmentType" value={formData.shipmentType} onChange={handleChange} required>
            <option value="">Select Shipment Type</option>
            <option value="FCL">Full Container Load (FCL)</option>
            <option value="LCL">Less than Container Load (LCL)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Container Type</label>
          <select name="containerType" value={formData.containerType} onChange={handleChange} required>
            <option value="">Select Container Type</option>
            <option value="20ft">20ft Standard</option>
            <option value="40ft">40ft Standard</option>
            <option value="40ft-hc">40ft High Cube</option>
          </select>
        </div>
        <div className="form-group">
          <label>Number of Containers</label>
          <input type="number" name="containerCount" value={formData.containerCount} onChange={handleChange} min="1" required />
        </div>
        <div className="form-group">
          <label>Cargo Weight (kg)</label>
          <input type="number" name="cargoWeight" value={formData.cargoWeight} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Cargo Description</label>
          <textarea name="cargoDescription" value={formData.cargoDescription} onChange={handleChange} required />
        </div>
      </div>

      <div className="form-section">
        <h3>Route Information</h3>
        <div className="form-group">
          <label>Origin Port</label>
          <input type="text" name="originPort" value={formData.originPort} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Destination Port</label>
          <input type="text" name="destinationPort" value={formData.destinationPort} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Departure Date</label>
          <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Estimated Arrival Date</label>
          <input type="date" name="arrivalDate" value={formData.arrivalDate} onChange={handleChange} required />
        </div>
      </div>

      <div className="form-section">
        <h3>Contact Information</h3>
        <div className="form-group">
          <label>Company Name</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contact Name</label>
          <input type="text" name="contactName" value={formData.contactName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
      </div>

      <div className="form-section">
        <h3>Additional Services</h3>
        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" name="insurance" checked={formData.additionalServices.includes('insurance')} onChange={handleChange} />
            Cargo Insurance
          </label>
        </div>
        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" name="customsClearance" checked={formData.additionalServices.includes('customsClearance')} onChange={handleChange} />
            Customs Clearance
          </label>
        </div>
        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" name="inlandTransportation" checked={formData.additionalServices.includes('inlandTransportation')} onChange={handleChange} />
            Inland Transportation
          </label>
        </div>
      </div>

      <button type="submit" className="submit-btn">Submit Booking</button>
    </form>
  );
};

export default BookingForm;
