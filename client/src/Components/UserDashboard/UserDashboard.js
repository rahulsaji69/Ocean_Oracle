import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import "./UserDashboard.css"; 

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState("");
  console.log(userDetails);
  const Base_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate(); 

  const fetchUserDetails = () => {
    setUserDetails(JSON.parse(localStorage.getItem("user")));
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (!token) {
      navigate("/login"); 
    } 
  }, [Base_URL, navigate]); 

  const menuItems = [
    "Dashboard",
    "Instant quote",
    "eBookings",
    "Shipping Instructions",
    "Submit VGM",
    "Free time Detention Demurrage",
    "Documents",
    "My Profile",
  ];

  const handleLogout = () => {
      localStorage.removeItem("token");
      toast.success("Logged out successfully!");
      navigate("/");
  };

  return (
    <div className="dashboard-container">
      <ToastContainer /> 
      <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to Your Dashboard</h1>
          <p className="hero-subtitle">
            Manage your shipping and logistics with ease.
          </p>
        </div>
      </div>
      <div className="sidebar">
        <div className="user-info">
          <p>Welcome</p>
          <h3>{userDetails ? userDetails.name : ""}</h3>
          <p>{userDetails ? userDetails.email : ""}</p>
        </div>
        <ul className="menu-list">
          {menuItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="logout-button" onClick={handleLogout}>
          <span>Logout</span>
        </div>
      </div>
      <div className="main-content">
        <div className="tracking-container">
          <h1>Tracking</h1>
          <div className="tracking-options">
            <input type="radio" id="container" name="tracking" />
            <label htmlFor="container">Container / Bill of Lading Number</label>
            <input type="radio" id="booking" name="tracking" />
            <label htmlFor="booking">Booking Number</label>
          </div>
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
