import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const CalendarForm = ({ onSync }) => {
  const [eventName, setEventName] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const handleSync = () => {
    if (!eventName) {
      alert("Please enter an event name!");
      return;
    }
    if (startTime >= endTime) {
      alert("End time must be after start time!");
      return;
    }

    onSync({ eventName, startTime, endTime });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="sm" style={{ marginTop: 20 }}>
        <Typography variant="h5" gutterBottom>
          Add Event
        </Typography>
        <TextField 
          label="Event Name" 
          fullWidth 
          value={eventName} 
          onChange={(e) => setEventName(e.target.value)} 
          margin="normal"
        />
        <DateTimePicker
          label="Start Time"
          value={startTime}
          onChange={setStartTime}
          renderInput={(props) => <TextField fullWidth margin="normal" {...props} />}
        />
        <DateTimePicker
          label="End Time"
          value={endTime}
          onChange={setEndTime}
          renderInput={(props) => <TextField fullWidth margin="normal" {...props} />}
        />
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          onClick={handleSync} 
          style={{ marginTop: 20 }}
        >
          Sync with Google
        </Button>
      </Container>
    </LocalizationProvider>
  );
};

export default CalendarForm;
