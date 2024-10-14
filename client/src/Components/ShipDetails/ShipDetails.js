import React, { useState } from 'react';
import './ShipDetails.css';
import axios from 'axios';

const ShipDetails = () => {
  const [shipData, setShipData] = useState({
    shipName: '',
    imoNumber: '',
    shipType: '',
    flag: '',
    cargoCapacity: '',
    loa: '',
    draft: '',
    beam: '',
    inspectionStatus: ''
  });
  const Base_URL = process.env.REACT_APP_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${Base_URL}/api/ships`,{shipData});
      console.log(response);
    //   if (response.ok) {
    //     const newShip = await response.json();
    //     console.log('Ship created successfully:', newShip);
    //     // Reset the form after successful submission
    //     setShipData({
    //       shipName: '',
    //       imoNumber: '',
    //       shipType: '',
    //       flag: '',
    //       cargoCapacity: '',
    //       currentCargoLoad: '',
    //       availableCapacity: '',
    //       currentLocation: '',
    //       routeInformation: '',
    //       eta: '',
    //       status: '',
    //       loa: '',
    //       draft: '',
    //       beam: '',
    //       nextPortOfCall: '',
    //       availableBookingSlots: '',
    //       homeport: '',
    //       inspectionStatus: ''
    //     });
    //   } else {
    //     console.error('Failed to create ship');
    //   }
    } catch (error) {
      console.error('Error submitting the ship data:', error);
    }
  };
  

  return (
    <div className="ship-details-container">
      <h2>Add Ship Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Basic Ship Information</h3>
          <input type="text" name="shipName" value={shipData.shipName} onChange={handleChange} placeholder="Ship Name" required />
          <input type="text" name="imoNumber" value={shipData.imoNumber} onChange={handleChange} placeholder="IMO Number" required />
          <input type="text" name="shipType" value={shipData.shipType} onChange={handleChange} placeholder="Ship Type" required />
          <input type="text" name="flag" value={shipData.flag} onChange={handleChange} placeholder="Flag" required />
        </div>

        <div className="form-section">
          <h3>Cargo and Capacity</h3>
          <input type="number" name="cargoCapacity" value={shipData.cargoCapacity} onChange={handleChange} placeholder="Cargo Capacity" required />
        </div>

        <div className="form-section">
          <h3>Technical Specifications</h3>
          <input type="number" name="loa" value={shipData.loa} onChange={handleChange} placeholder="Length Overall (LOA)" required />
          <input type="number" name="draft" value={shipData.draft} onChange={handleChange} placeholder="Draft" required />
          <input type="number" name="beam" value={shipData.beam} onChange={handleChange} placeholder="Beam" required />
        </div>

        <div className="form-section">
          <h3>Compliance Information</h3>
          <input type="text" name="inspectionStatus" value={shipData.inspectionStatus} onChange={handleChange} placeholder="Inspection Status" required />
        </div>

        <button type="submit">Add Ship</button>
      </form>
    </div>
  );
};

export default ShipDetails;