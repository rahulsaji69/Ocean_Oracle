import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import AddSchedule from "./AddSchedule"; // Import the AddSchedule component
import axios from "axios"; // Import axios for API calls
import "./ShipSchedule.css";

const ShipSchedule = () => {
  const [schedules, setSchedules] = useState([]); // State to hold the schedules
  const [isAddScheduleDialogOpen, setIsAddScheduleDialogOpen] = useState(false);
  const Base_URL = process.env.REACT_APP_BASE_URL;

  const handleAddScheduleClick = () => {
    setIsAddScheduleDialogOpen(true);
  };

  const handleScheduleAdded = () => {
    console.log("Schedule added successfully");
    fetchSchedules(); // Fetch schedules again after adding a new one
  };

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`${Base_URL}/api/ships/schedules`);
      setSchedules(response.data);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  useEffect(() => {
    fetchSchedules(); // Fetch schedules when component mounts
  }, [Base_URL]);

  return (
    <div className="ship-schedule">
      <Typography variant="h4" className="page-title">
        Ship Schedules
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddScheduleClick}
        style={{ marginTop: "20px" }}
      >
        Add Schedule
      </Button>

      <AddSchedule
        open={isAddScheduleDialogOpen}
        onClose={() => setIsAddScheduleDialogOpen(false)}
        onScheduleAdded={handleScheduleAdded}
      />

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {schedules.map((schedule) => (
          <Grid item xs={12} md={6} key={schedule._id}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h6">
                Ship ID: {schedule.shipId?.shipName || "N/A"}
              </Typography>
              <Typography variant="body1">
                Starting Port: {schedule.startingPort}
              </Typography>
              <Typography variant="body1">
                Destination Port: {schedule.destinationPort}
              </Typography>
              <Typography variant="body1">
                Current Location: {schedule.currentLocation}
              </Typography>
              <Typography variant="body1">
                ETA: {new Date(schedule.eta).toLocaleString()}
              </Typography>
              <Typography variant="body1">
                ETD: {new Date(schedule.etd).toLocaleString()}
              </Typography>

              <Typography variant="body1" style={{ marginTop: "10px" }}>
                Intermediate Ports:
              </Typography>
              <Stepper activeStep={0} alternativeLabel>
                {schedule.intermediatePorts.map((port, index) => (
                  <Step key={index}>
                    <StepLabel>{port}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ShipSchedule;
