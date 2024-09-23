import React from 'react';
import './HomePage.css';
import cargoCoverImage from '../../Assets/cargo cover solution.jpg'; 

const Home = () => {
  return (
    <div className="home">
      {/* Header Section */}
      <section className="header-section">
        <div className="container">
          <div className="header-content">
            <h1>Leader in Shipping & Logistics</h1>
            <div className="tracking">
              <h3>Tracking</h3>
              <div className="tracking-options">
                <label>
                  <input type="radio" name="tracking" value="container" defaultChecked />
                  Container / Bill of Lading Number
                </label>
                <label>
                  <input type="radio" name="tracking" value="booking" />
                  Booking Number
                </label>
                <input type="text" placeholder="Search..." />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Solutions Section */}
      <section className="solutions-section">
        <div className="container">
          <h2>Our Solutions</h2>
          <p>
            As well as being a global leader in container shipping, our worldwide teams of industry specific experts mean we can offer our customers round-the-clock personalised service. This ensures we deliver fast and reliable transit times, and that we provide the best solutions for your needs.
          </p>
          <div className="solutions-grid">
            <div className="solution">
              <h3>Shipping Solutions</h3>
              <img src="path-to-ship-icon.png" alt="Shipping Icon" />
            </div>
            <div className="solution">
              <h3>Inland Transportation & Logistics Solutions</h3>
              <img src="path-to-train-icon.png" alt="Train Icon" />
            </div>
            <div className="solution">
              <h3>Air Cargo Solutions</h3>
              <img src="../src/Assets/cc.jpg" alt="Airplane Icon" />
            </div>
            <div className="solution">
              <h3>Digital Business Solutions</h3>
              <img src="path-to-digital-icon.png" alt="Digital Icon" />
            </div>
            <div className="solution">
              <h3>Cargo Cover Solutions</h3>
              <img src={cargoCoverImage} alt="Cargo Icon" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
