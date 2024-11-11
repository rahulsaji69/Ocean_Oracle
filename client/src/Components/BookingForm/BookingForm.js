import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingForm.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    // Shipper Information
    shipperName: '',
    shipperPhone: '',
    shipperEmail: '',
    shipperAddress: '',

    // Receiver Information
    receiverName: '',
    receiverPhone: '',
    receiverEmail: '',
    receiverAddress: '',

    // Cargo Details
    cargoType: '',
    cargoWeight: '',
    cargoDimensions: { length: '', width: '', height: '' },
    cargoQuantity: '',
    cargoValue: '',

    // Shipment Type
    serviceType: '',
    shippingClass: '',

    // Origin and Destination
    originPort: '',
    destinationPort: '',

    // Schedule and Route
    preferredShippingDate: '',
    preferredCarrier: '',

    // Insurance
    insuranceRequired: false,
    insuranceValue: '',

    // Special Handling
    specialInstructions: '',
    isFragile: false,
    requiresRefrigeration: false,
    isHazardous: false,

    // Payment Information
    paymentMethod: '',

    // Tracking and Notifications
    trackingPreference: '',

    // Customs Information
    hsCode: '',
    customsDocuments: [],

    // Additional Services
    additionalServices: [],
  });
  const [dateError, setDateError] = useState('');
  const navigate = useNavigate();

  const Base_URL = process.env.REACT_APP_BASE_URL;

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Set today's date as the initial value for preferredShippingDate
    setFormData(prevData => ({
      ...prevData,
      preferredShippingDate: today
    }));
  }, []);

  const validateField = (name, value) => {
    let error = '';
    if (!value && name !== 'additionalServices') {
      error = 'This field is required';
    }
    // Add more specific validations here if needed
    return error;
  };

  const validateDate = (value) => {
    const selectedDate = new Date(value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      return "Please select a future date";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'additionalServices') {
        const updatedServices = checked
          ? [...formData.additionalServices, value]
          : formData.additionalServices.filter(service => service !== value);
        setFormData({ ...formData, additionalServices: updatedServices });
      } else {
        setFormData({ ...formData, [name]: checked });
      }
    } else if (name.startsWith('cargoDimensions.')) {
      const dimension = name.split('.')[1];
      setFormData({
        ...formData,
        cargoDimensions: { ...formData.cargoDimensions, [dimension]: value }
      });
    } else if (type === 'date') {
      const error = validateDate(value);
      setDateError(error);
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields before submitting
    const formErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) formErrors[key] = error;
    });

    // Only proceed if no validation errors exist
    if (Object.keys(formErrors).length === 0 && !dateError) {
      try {
        // First create the booking
        const bookingData = {
          ...formData,
          preferredShippingDate: formData.preferredShippingDate ? 
            new Date(formData.preferredShippingDate).toISOString() : null,
        };
        
        const bookingResponse = await axios.post(
          `${Base_URL}/api/booking/bookings`, 
          bookingData
        );
        console.log('Booking Successful:', bookingResponse.data);

        // Then create Razorpay order
        const orderResponse = await axios.post(
          `${Base_URL}/api/payment/create-order`,
          {
            amount: 10000 * 100, 
            bookingId: bookingResponse.data.data._id
          }
        );

      
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: orderResponse.data.order.amount,
          currency: "INR",
          name: "OCEANORACLE PAYMENT GATEWAY",
          description: "Booking Payment",
          order_id: orderResponse.data.order.id,
          handler: async function (response) {
            try {
              // Verify payment
              await axios.post(`${Base_URL}/api/payment/verify`, {
                bookingId: bookingResponse.data.data._id,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                amount: orderResponse.data.order.amount
              });
              Swal.fire({
                title: "Payment successful!",
                text: " Booking confirmed",
                icon: "success"
              });
              navigate('/dashboard');
            } catch (error) {
              console.error('Payment verification failed:', error);
              alert('Payment verification failed. Please contact support.');
            }
          },
          prefill: {
            name: formData.shipperName,
            email: formData.shipperEmail,
            contact: formData.shipperPhone
          },
          theme: {
            color: "#3399cc"
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();

      } catch (error) {
        console.error('Error:', error);
        let errorMessage = 'An error occurred. Please try again.';
        
        if (error.response) {
          console.error('Error data:', error.response.data);
          errorMessage = error.response.data.message || errorMessage;
        }
        
        alert(errorMessage);
      }
    } else {
      console.error('Form validation errors:', formErrors);
      alert('Please fill in all required fields correctly.');
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2>Ship Booking Form</h2>
      
      <div className="form-section">
        <h3>Shipper Information</h3>
        <input type="text" name="shipperName" value={formData.shipperName} onChange={handleChange} placeholder="Shipper Name" required />
        <input type="tel" name="shipperPhone" value={formData.shipperPhone} onChange={handleChange} placeholder="Shipper Phone" required />
        <input type="email" name="shipperEmail" value={formData.shipperEmail} onChange={handleChange} placeholder="Shipper Email" required />
        <textarea name="shipperAddress" value={formData.shipperAddress} onChange={handleChange} placeholder="Shipper Address" required />
      </div>

      <div className="form-section">
        <h3>Receiver Information</h3>
        <input type="text" name="receiverName" value={formData.receiverName} onChange={handleChange} placeholder="Receiver Name" required />
        <input type="tel" name="receiverPhone" value={formData.receiverPhone} onChange={handleChange} placeholder="Receiver Phone" required />
        <input type="email" name="receiverEmail" value={formData.receiverEmail} onChange={handleChange} placeholder="Receiver Email" required />
        <textarea name="receiverAddress" value={formData.receiverAddress} onChange={handleChange} placeholder="Receiver Address" required />
      </div>

      <div className="form-section">
        <h3>Cargo Details</h3>
        <select name="cargoType" value={formData.cargoType} onChange={handleChange} required>
          <option value="">Select Cargo Type</option>
          <option value="container">Container</option>
          <option value="bulk">Bulk</option>
          <option value="vehicle">Vehicle</option>
          <option value="hazardous">Hazardous Goods</option>
        </select>
        <input type="number" name="cargoWeight" value={formData.cargoWeight} onChange={handleChange} placeholder="Cargo Weight (kg)" required />
        <input type="number" name="cargoDimensions.length" value={formData.cargoDimensions.length} onChange={handleChange} placeholder="Length (cm)" required />
        <input type="number" name="cargoDimensions.width" value={formData.cargoDimensions.width} onChange={handleChange} placeholder="Width (cm)" required />
        <input type="number" name="cargoDimensions.height" value={formData.cargoDimensions.height} onChange={handleChange} placeholder="Height (cm)" required />
        <input type="number" name="cargoQuantity" value={formData.cargoQuantity} onChange={handleChange} placeholder="Quantity" required />
        <input type="number" name="cargoValue" value={formData.cargoValue} onChange={handleChange} placeholder="Cargo Value" required />
      </div>

      <div className="form-section">
        <h3>Shipment Type</h3>
        <select name="serviceType" value={formData.serviceType} onChange={handleChange} required>
          <option value="">Select Service Type</option>
          <option value="door-to-door">Door to Door</option>
          <option value="port-to-port">Port to Port</option>
          <option value="door-to-port">Door to Port</option>
        </select>
        <select name="shippingClass" value={formData.shippingClass} onChange={handleChange} required>
          <option value="">Select Shipping Class</option>
          <option value="standard">Standard</option>
          <option value="express">Express</option>
        </select>
      </div>

      <div className="form-section">
        <h3>Origin and Destination</h3>
        <input type="text" name="originPort" value={formData.originPort} onChange={handleChange} placeholder="Origin Port" required />
        <input type="text" name="destinationPort" value={formData.destinationPort} onChange={handleChange} placeholder="Destination Port" required />
      </div>

      <div className="form-section">
        <h3>Schedule and Route</h3>
        <div className="date-input-wrapper">
          <input 
            type="date" 
            name="preferredShippingDate" 
            value={formData.preferredShippingDate} 
            onChange={handleChange} 
            min={today}
            required 
          />
          <label>Preferred Shipping Date</label>
          {dateError && <span className="error-message">{dateError}</span>}
        </div>
        <input type="text" name="preferredCarrier" value={formData.preferredCarrier} onChange={handleChange} placeholder="Preferred Carrier (optional)" />
      </div>

      <div className="form-section">
        <h3>Insurance</h3>
        <label>
          <input type="checkbox" name="insuranceRequired" checked={formData.insuranceRequired} onChange={handleChange} />
          Insurance Required
        </label>
        {formData.insuranceRequired && (
          <input type="number" name="insuranceValue" value={formData.insuranceValue} onChange={handleChange} placeholder="Insurance Value" required />
        )}
      </div>

      <div className="form-section">
        <h3>Special Handling</h3>
        <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} placeholder="Special Instructions" />
        <label>
          <input type="checkbox" name="isFragile" checked={formData.isFragile} onChange={handleChange} />
          Fragile Cargo
        </label>
        <label>
          <input type="checkbox" name="requiresRefrigeration" checked={formData.requiresRefrigeration} onChange={handleChange} />
          Requires Refrigeration
        </label>
        <label>
          <input type="checkbox" name="isHazardous" checked={formData.isHazardous} onChange={handleChange} />
          Hazardous Materials
        </label>
      </div>

      <div className="form-section">
        <h3>Payment Information</h3>
        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
          <option value="">Select Payment Method</option>
          <option value="creditCard">Credit Card</option>
          <option value="bankTransfer">Bank Transfer</option>
        </select>
      </div>

      <div className="form-section">
        <h3>Tracking and Notifications</h3>
        <select name="trackingPreference" value={formData.trackingPreference} onChange={handleChange} required>
          <option value="">Select Tracking Preference</option>
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="both">Both Email and SMS</option>
        </select>
      </div>

      <div className="form-section">
        <h3>Customs Information</h3>
        <input type="text" name="hsCode" value={formData.hsCode} onChange={handleChange} placeholder="HS Code" />
        {/* You might want to add a file upload component here for customs documents */}
      </div>

      <div className="form-section">
        <h3>Additional Services</h3>
        <label>
          <input type="checkbox" name="additionalServices" value="customsClearance" checked={formData.additionalServices.includes('customsClearance')} onChange={handleChange} />
          Customs Clearance
        </label>
        <label>
          <input type="checkbox" name="additionalServices" value="packaging" checked={formData.additionalServices.includes('packaging')} onChange={handleChange} />
          Packaging
        </label>
        <label>
          <input type="checkbox" name="additionalServices" value="warehousing" checked={formData.additionalServices.includes('warehousing')} onChange={handleChange} />
          Warehousing
        </label>
      </div>

      <button type="submit" className="submit-btn">Submit Booking</button>
    </form>
  );
};

export default BookingForm;
