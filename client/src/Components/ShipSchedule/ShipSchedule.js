import React, { useState } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  TextField
} from '@mui/material';
import './ShipSchedule.css';

const mockShips = [
  {
    id: 1,
    name: 'MSC Gülsün',
    currentLocation: 'Singapore',
    route: ['Rotterdam', 'Singapore', 'Shanghai', 'Los Angeles'],
    eta: '2023-06-15T10:00:00',
    etd: '2023-06-16T14:00:00'
  },
  // Add more mock ships here
];

const ShipSchedule = () => {
  const [selectedShip, setSelectedShip] = useState(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updatedShipData, setUpdatedShipData] = useState({});

  const handleShipClick = (ship) => {
    setSelectedShip(ship);
  };

  const handleUpdateClick = () => {
    setUpdatedShipData(selectedShip);
    setIsUpdateDialogOpen(true);
  };

  const handleUpdateClose = () => {
    setIsUpdateDialogOpen(false);
  };

  const handleUpdateSave = () => {
    // Here you would typically send the updated data to your backend
    console.log('Updated ship data:', updatedShipData);
    setSelectedShip(updatedShipData);
    setIsUpdateDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedShipData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="ship-schedule">
      <Typography variant="h4" className="page-title">Ship Schedules</Typography>
      <div className="schedule-container">
        <List className="ship-list">
          {mockShips.map((ship) => (
            <ListItem 
              key={ship.id} 
              button 
              onClick={() => handleShipClick(ship)}
              selected={selectedShip && selectedShip.id === ship.id}
            >
              <ListItemText primary={ship.name} />
            </ListItem>
          ))}
        </List>
        {selectedShip && (
          <div className="ship-details">
            <Typography variant="h5">{selectedShip.name}</Typography>
            <Typography>Current Location: {selectedShip.currentLocation}</Typography>
            <Typography>ETA: {new Date(selectedShip.eta).toLocaleString()}</Typography>
            <Typography>ETD: {new Date(selectedShip.etd).toLocaleString()}</Typography>
            <Stepper activeStep={selectedShip.route.indexOf(selectedShip.currentLocation)} orientation="vertical">
              {selectedShip.route.map((port, index) => (
                <Step key={port}>
                  <StepLabel>{port}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Button variant="contained" color="primary" onClick={handleUpdateClick}>
              Update Details
            </Button>
          </div>
        )}
      </div>
      <Dialog open={isUpdateDialogOpen} onClose={handleUpdateClose}>
        <DialogTitle>Update Ship Details</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="currentLocation"
            label="Current Location"
            type="text"
            fullWidth
            value={updatedShipData.currentLocation || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="eta"
            label="Estimated Time of Arrival"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={updatedShipData.eta ? updatedShipData.eta.slice(0, 16) : ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="etd"
            label="Estimated Time of Departure"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={updatedShipData.etd ? updatedShipData.etd.slice(0, 16) : ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShipSchedule;