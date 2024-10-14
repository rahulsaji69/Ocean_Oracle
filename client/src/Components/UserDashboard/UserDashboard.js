import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserDashboard.css";
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  AppBar, 
  Toolbar, 
  Typography 
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from '../../Assets/Logo.jpg'; // Import the logo

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const fetchUserDetails = () => {
    setUserDetails(JSON.parse(localStorage.getItem("user")));
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const menuItems = [
    "Dashboard",
    "Instant quote",
    "eBookings",
    "Shipping Instructions",
    "Free time Detention Demurrage",
    "Documents",
    "My Profile",
    "Logout" // Add Logout to the drawer menu
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((text, index) => (
          <ListItem button key={text} onClick={() => {
            if (text === "Logout") {
              handleLogout();
            } else {
              navigate(`/${text.replace(" ", "").toLowerCase()}`);
            }
          }}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className="dashboard-container">
      <ToastContainer />
      <AppBar position="static" style={{ backgroundColor: 'white', color: '#333' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <div className="navbar-logo" style={{ flexGrow: 1, textAlign: 'center' }}>
            <Link to="/">
              <img src={Logo} alt="Logo" style={{ height: '40px' }} />
            </Link>
          </div>
          <div className="navbar-menu" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Link to="#search" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Search</Link>
            <Link to="#tracking" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Tracking</Link>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
      <div className="header-section">
        <h1 className="main-title">Welcome to Your Dashboard</h1>
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
          </div>
          <input type="text" placeholder="Enter tracking number..." className="search-input" />
        </div>
      </div>
      <div className="main-content">
        {/* Removed the tracking box below the background image */}
      </div>
    </div>
  );
};

export default Dashboard;
