import React, { useState } from 'react';
import axios from 'axios';
import './ScheduledShip.css';

const ScheduledShip = () => {
  const [fromPort, setFromPort] = useState('');
  const [toPort, setToPort] = useState('');
  const [date, setDate] = useState('');
  const [vesselName, setVesselName] = useState('');
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('point-to-point');

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let params = {};
      if (activeTab === 'point-to-point') {
        params = { startingPort: fromPort, destinationPort: toPort, date: date };
      } else if (activeTab === 'vessel') {
        params = { vesselName: vesselName };
      }
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/ships/schedules`, { params });
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setError('Failed to fetch schedules. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapPorts = () => {
    setFromPort(toPort);
    setToPort(fromPort);
  };

  const handleInputFocus = (e) => {
    e.target.parentNode.classList.add('focused');
  };

  const handleInputBlur = (e) => {
    if (!e.target.value) {
      e.target.parentNode.classList.remove('focused');
    }
  };

  return (
    <div className="scheduled-ship-container">
      <h1>Schedules</h1>
      <div className="scheduled-ship-search-container">
        <div className="scheduled-ship-tabs">
          {['point-to-point', 'vessel', 'arrivals/departures'].map((tab) => (
            <button
              key={tab}
              className={`scheduled-ship-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
        <form onSubmit={handleSearch}>
          {activeTab === 'point-to-point' && (
            <>
              <div className="scheduled-ship-input-group">
                <div className="scheduled-ship-input-wrapper">
                  <input
                    className="scheduled-ship-input"
                    type="text"
                    value={fromPort}
                    onChange={(e) => setFromPort(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    required
                  />
                  <label className="scheduled-ship-label">From Port</label>
                </div>
                <button type="button" onClick={handleSwapPorts} className="scheduled-ship-swap-btn">
                  <span className="material-icons">swap_horiz</span>
                </button>
                <div className="scheduled-ship-input-wrapper">
                  <input
                    className="scheduled-ship-input"
                    type="text"
                    value={toPort}
                    onChange={(e) => setToPort(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    required
                  />
                  <label className="scheduled-ship-label">To Port</label>
                </div>
              </div>
              <div className="scheduled-ship-date-wrapper">
                <input
                  className="scheduled-ship-input"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                />
                <label className="scheduled-ship-label">Departure Date</label>
              </div>
            </>
          )}
          {activeTab === 'vessel' && (
            <div className="scheduled-ship-vessel-wrapper">
              <span className="material-icons vessel-icon">directions_boat</span>
              <input
                className="scheduled-ship-input vessel-input"
                type="text"
                value={vesselName}
                onChange={(e) => setVesselName(e.target.value)}
                placeholder="Enter vessel name"
                required
              />
            </div>
          )}
          <button type="submit" className="scheduled-ship-search-btn" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>
      {error && <p className="scheduled-ship-error-message">{error}</p>}
      {schedules.length > 0 && (
        <div className="scheduled-ship-results-container">
          <h2>{fromPort} &gt; {toPort}</h2>
          <p>SERVICE: COLOMBO - COCHIN - NEW MANGALORE FEEDER</p>
          <p>{schedules.length} Results</p>
          <table>
            <thead>
              <tr>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Vessel / Voyage No.</th>
                <th>Estimated Transit Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, index) => (
                <tr key={index}>
                  <td>{new Date(schedule.etd).toLocaleDateString()}</td>
                  <td>{new Date(schedule.eta).toLocaleDateString()}</td>
                  <td>{schedule.shipId?.shipName || 'N/A'} / {schedule.voyageNumber || 'N/A'}</td>
                  <td>{Math.ceil((new Date(schedule.eta) - new Date(schedule.etd)) / (1000 * 60 * 60 * 24))} Days</td>
                  <td>
                    <button className="scheduled-ship-quote-btn">I need a quote</button>
                    <button className="scheduled-ship-book-btn">I'm ready to book</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ScheduledShip;
