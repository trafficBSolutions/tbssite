import React, { useState } from 'react';
import '../css/bollard.css'
import '../css/header.css'
import '../css/footer.css'
import axios from 'axios';
import Header from '../components/headerviews/HeaderDropBollard'

const states = [
  { abbreviation: 'AL', name: 'Alabama' },
  { abbreviation: 'AK', name: 'Alaska' },
  { abbreviation: 'AZ', name: 'Arizona' },
  { abbreviation: 'AR', name: 'Arkansas' },
  { abbreviation: 'CA', name: 'California' },
  { abbreviation: 'CO', name: 'Colorado' },
  { abbreviation: 'CT', name: 'Connecticut' },
  { abbreviation: 'DE', name: 'Delaware' },
  { abbreviation: 'FL', name: 'Florida' },
  { abbreviation: 'GA', name: 'Georgia' },
  { abbreviation: 'HI', name: 'Hawaii' },
  { abbreviation: 'ID', name: 'Idaho' },
  { abbreviation: 'IL', name: 'Illinois' },
  { abbreviation: 'IN', name: 'Indiana' },
  { abbreviation: 'IA', name: 'Iowa' },
  { abbreviation: 'KS', name: 'Kansas' },
  { abbreviation: 'KY', name: 'Kentucky' },
  { abbreviation: 'LA', name: 'Louisiana' },
  { abbreviation: 'ME', name: 'Maine' },
  { abbreviation: 'MD', name: 'Maryland' },
  { abbreviation: 'MA', name: 'Massachusetts' },
  { abbreviation: 'MI', name: 'Michigan' },
  { abbreviation: 'MN', name: 'Minnesota' },
  { abbreviation: 'MS', name: 'Mississippi' },
  { abbreviation: 'MO', name: 'Missouri' },
  { abbreviation: 'MT', name: 'Montana' },
  { abbreviation: 'NE', name: 'Nebraska' },
  { abbreviation: 'NV', name: 'Nevada' },
  { abbreviation: 'NH', name: 'New Hampshire' },
  { abbreviation: 'NJ', name: 'New Jersey' },
  { abbreviation: 'NM', name: 'New Mexico' },
  { abbreviation: 'NY', name: 'New York' },
  { abbreviation: 'NC', name: 'North Carolina' },
  { abbreviation: 'ND', name: 'North Dakota' },
  { abbreviation: 'OH', name: 'Ohio' },
  { abbreviation: 'OK', name: 'Oklahoma' },
  { abbreviation: 'OR', name: 'Oregon' },
  { abbreviation: 'PA', name: 'Pennsylvania' },
  { abbreviation: 'RI', name: 'Rhode Island' },
  { abbreviation: 'SC', name: 'South Carolina' },
  { abbreviation: 'SD', name: 'South Dakota' },
  { abbreviation: 'TN', name: 'Tennessee' },
  { abbreviation: 'TX', name: 'Texas' },
  { abbreviation: 'UT', name: 'Utah' },
  { abbreviation: 'VT', name: 'Vermont' },
  { abbreviation: 'VA', name: 'Virginia' },
  { abbreviation: 'WA', name: 'Washington' },
  { abbreviation: 'WV', name: 'West Virginia' },
  { abbreviation: 'WI', name: 'Wisconsin' },
  { abbreviation: 'WY', name: 'Wyoming' }
];

export default function BollardsWheels() {
  const [phone, setPhone] = useState('');
  const [selectedBollard, setSelectedBollard] = useState('');
  const [selectedWheel, setSelectedWheel] = useState('')
  const [quantityBollard, setBollardQuantity] = useState(1); // Default Bollard quantity
  const [quantityWheel, setWheelQuantity] = useState(1) // Default Wheel quantity
  const [addedBollard, setAddedBollard] = useState([]);
  const [addedWheel, setAddedWheel] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    first: '',
    last: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    bollard: '',
    wheel: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [newErrors, setNewErrors] = useState({}); // Using useState for newErrors
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');

  const handlePhoneChange = (event) => {
    const input = event.target.value;
    const formatted = input.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    setPhone(formatted);
    setFormData({ ...formData, phone: formatted });
  };

  const handleAddBollard = () => {
    if (quantityBollard > 0) {
      setAddedBollard([...addedBollard, `Bollards: ${quantityBollard}`]);
      setBollardQuantity(1); // Reset quantity
      setErrors({ ...errors, bollardWheel: '' }); // Clear bollardWheel error
    }
  };
  
  const handleAddWheel = () => {
    if (quantityWheel > 0) {
      setAddedWheel([...addedWheel, `Wheel Stops: ${quantityWheel}`]);
      setWheelQuantity(1); // Reset quantity
      setErrors({ ...errors, bollardWheel: '' }); // Clear bollardWheel error
    }
  };
  const handleBollardQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setBollardQuantity(newQuantity);
    }
  };

  const handleWheelQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setWheelQuantity(newQuantity);
    }
  };

  const handleRemoveBollard = (index) => {
    const updatedBollard = [...addedBollard];
    updatedBollard.splice(index, 1);
    setAddedBollard(updatedBollard);
  };

  const handleRemoveWheel = (index) => {
    const updatedWheel = [...addedWheel];
    updatedWheel.splice(index, 1);
    setAddedWheel(updatedWheel);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ['first', 'last', 'company', 'email', 'phone', 'address', 'city', 'state', 'zip', 'message'];
    
    requiredFields.forEach(field => {
        if (!formData[field]) {
            let fieldLabel = field.charAt(0).toUpperCase() + field.slice(1);
            if (field === 'first') fieldLabel = 'First Name';
            if (field === 'last') fieldLabel = 'Last Name';
            if (field === 'company') fieldLabel = 'Company Name';
            if (field === 'phone') fieldLabel = 'Phone Number';
            if (field === 'address') fieldLabel = 'Address';
            if (field === 'city') fieldLabel = 'City';
            if (field === 'state') fieldLabel = 'State';
            if (field === 'zip') fieldLabel = 'Zip Code';
            if (field === 'message') fieldLabel = 'Message';
            newErrors[field] = `${fieldLabel} is required!`;
        }
    });
  
    // Check if either bollards or wheel stops are selected
    /*
    if (!selectedBollard && !selectedWheel) {
      newErrors['bollardWheel'] = 'Please select either Bollards or Wheel Stops';
    }
  */
    if (Object.keys(newErrors).length > 0) {
      setErrorMessage('Required fields are Missing.');
      setErrors(newErrors);
      return;
    }
  
    try {
      // Populate bollardwheel field based on user's selections
      const bollardString = addedBollard.join(', ');
      const wheelString = addedWheel.join(', ')
      const formDataToSend = {
        ...formData,
        bollard: bollardString, // Update the equipment field with added equipment
        wheel: wheelString,
      };
  
      const response = await axios.post('/bollardswheels', formDataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log(response.data);
      setFormData({
        first: '',
        last: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        bollard: '',
        wheel: '',
        message: ''
      });
      setErrors({});
      setNewErrors({})
      setPhone('');
      setAddedBollard([]); // Clear added Bollard
      setAddedWheel([]);
      setSubmissionMessage('Bollard/Wheel Stop Request Submitted! We will be with you within 48 hours!');
    } catch (error) {
      console.error('Error submitting Bollard/Wheel Stop Request:', error);
    }
  };
    return (
        <div>
            <Header />
      <main className="bollard-main">
      <div className="bollard-container">
          <h1 className="bollard-flag">BOLLARD AND WHEEL STOP INSTALLATION</h1>
          
        </div>
        <h2 className="bollard-descript">Bollards are short, sturdy posts typically made of metal, concrete, or plastic.
They are installed vertically into the ground and are often used to delineate boundaries, control traffic flow, protect buildings or infrastructure, and enhance security.
Bollards come in various shapes and sizes, including removable, retractable, and fixed types.
They are commonly found in urban areas, parking lots, sidewalks, and other public spaces.
Bollards help prevent unauthorized vehicle access to pedestrian areas, protect buildings from accidental collisions, and provide a visual barrier to guide traffic.</h2>
<h2 className="wheel-descript">Wheel stops, also known as parking blocks or parking curbs, are low-profile barriers placed at the end of parking spaces to prevent vehicles from rolling too far forward.
They are typically made of concrete or rubber and are anchored to the ground.
Wheel stops help drivers position their vehicles properly within parking spaces and prevent them from encroaching onto sidewalks, landscaping, or other parked vehicles.
They also reduce the risk of property damage caused by vehicles overshooting parking spaces.
In parking garages, wheel stops are essential for maximizing space utilization and ensuring orderly parking.</h2>
        <form className="bollard-form" onSubmit={handleSubmit} method="post">
           <div className="bollard-form-container container--narrow page-section">
            <h1 className="bollard-form-box">Bollard and Wheel Stop Installation Form</h1>
            <h2 className="bollard-form-descript">Please Fill Out the Form Below to Submit Your Bollard and Wheel Stop Installation</h2>
            <label className="bollard-name">Name: </label>
            <div className="first-bollard-input">
              <div className="first-bollard-name">
                <label className="bollard-first-name-label">First Name* </label>
                <input className="bollard-firstname-input" type="text" name="first" placeholder="First Name" 
                value={formData.first} onChange={(e) => setFormData({ ...formData, first: e.target.value })}
                 />
                 {errors.first && <div className="error-message">{errors.first}</div>}
                </div>
              <div className="last-bollard-name">
                <div className="last-bollardinput">
                  <label className="bollard-last-name-label">Last Name* </label>
                  <input className="bollard-lastname-input" type="text" name="last" placeholder="Last Name" 
                  value={formData.last} onChange={(e) => setFormData({ ...formData, last: e.target.value })}
                  />
                  {errors.last && <div className="error-message">{errors.last}</div>}
                </div>  
              </div>
              </div>
              <label className="bollard-company-label">Company: </label>
              <div className="bollard-company-input">
                <div className="bollard-company-input-container">
                  <label className="bollard-companylabel">Company* </label>
                  <input className="bollard-companyinput" type="text" name="company" placeholder="Company" 
                  value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}/>
                  {errors.company && <div className="error-message">{errors.company}</div>}
                  </div>
                  </div>
              <label className="bollard-emailphone-label">Email/Phone Number: </label>
              <div className="bollard-emailphone-input">
                <div className="bollard-email-input">
                  <label className="bollard-email-label">Email* </label>
                  <input className="bollard-emailinput" type="text" name="email" placeholder="Email" 
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
                  {errors.email && <div className="error-message">{errors.email}</div>}
                  </div>
                  <div className="bollard-phone-input">
                    <label className="bollard-phone-label">Phone Number* </label>
                    <input className="bollard-phoneinput" type="text" name="phone"
                    placeholder="Enter Phone Number"
                    value={phone} // Bind to phone state
                    onChange={handlePhoneChange} />
                    {errors.phone && <div className="error-message">{errors.phone}</div>}
                    </div>
                  </div>
              <label className="bollard-address-label">Address of Job Site: </label>
              <div className="bollard-address-input-container">
                <div className="bollard-address-input">
                  <div className="bollard-address-inputing">
                    <div className="bollard-addr-input">
                  <label className="bollardaddress-label">Address* </label>
                  <input className="bollard-addressinput" type="text" name="address" placeholder="Address" 
                  value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })}/>
                  
                  {errors.address && <div className="error-message">{errors.address}</div>}
                  </div>
                  <div className="bollard-city-input">
                    <label className="bollard-city-label">City* </label>
                    <input className="bollard-cityinput" type="text" name="city" placeholder="City" 
                    value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}/>
                    {errors.city && <div className="error-message">{errors.city}</div>}
                    </div>
                    </div>
                <div className="bollard-city-state">
                  <div className="bollard-state-input">
                    <label className="bollard-state-label">State* </label>
                    <select
                      name="state"
                      className="state-bollard-box"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}>
                      <option value="">Select State</option>
                      {states.map(state => (
                      <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option> ))}
                    </select>
                    </div>
                    {errors.state && <div className="error-message">{errors.state}</div>}
                  <div className="bollard-zip-input">
                     <label className="bollard-zip-label">Zip* </label>
                     <input className="bollard-zipinput" name="zip"
                        type="text"
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        placeholder="Zip Code"
                        maxLength={5}
                        pattern="\d{5}"
                        title="Zip code must be 5 digits"/>
                    </div>  
                    {errors.zip && <div className="error-message">{errors.zip}</div>}
                  </div>
                </div>
              </div>
            
            <label className="bollard-bollard-label">Bollards: </label>
            <div className="bollard-section">
              <div className="bollard-img-section">
                <div className="bollard-img-container">
              <img className="bollardimg" src="../public/bollards/bollards.jpeg"/>
              <h2 className="bollard-type">Concrete Bollards</h2>
              </div>
              <div className="bollard-img2-container">
                <img className="bollardimg2" src="../public/bollards/metal bollards.png"/>
                <h2 className="bollard2-type">Metal Bollards</h2>
              </div>
              </div>
              <div className="bollard-section-input">
                <div className="bollard-section-input-container">
                  <label className="bollard-section-label">Bollard Quantity* </label>
                  <h1 className="bollard-note">Please select the quantity of bollards you want to install</h1>
                  <div className="bollard-quantity-input">
                  <select
                    name="bollard"
                    className="bollard-select"
                    value={selectedBollard}
                    onChange={(e) => setSelectedBollard(e.target.value)}>
        <option value="">Bollards</option>
        </select>
        <input
          type="number"
          className="quantity-bollard-input"
          value={quantityBollard}
          onChange={handleBollardQuantityChange}
          min="1"
        />
        <button className="btn btn--full submit-bollard-quantity" type="button" onClick={handleAddBollard}>
          ADD BOLLARDS
        </button>
        <div className="bollard-quantity-list">
  <label className="added-bollard-label">Added Bollards:</label>
  <ul>
    {addedBollard.map((bollard, index) => (
      <li className="bollard-list" key={index}>
        {bollard}
        <button className="btn btn--full removebollard-quantity" onClick={() => handleRemoveBollard(index)}>REMOVE BOLLARDS</button>
      </li>
    ))}
  </ul>
</div>
        </div>
                  </div>
                  </div>
              </div>
              <label className="wheel-label">Wheel Stops: </label>
              <div className="wheel-section">
              <div className="wheel-img-section">
                <div className="wheel-img-container">
                <img className="wheelimg" src="../public/bollards/Wheelstop.jpg"/>
                <h2 className="wheel-type">Concrete Wheel Stop</h2>
                </div>
                <div className="wheel-img2-container">
                <img className="wheelimg2" src="../public/bollards/wheel stop rubber.png"/>
                <h2 className="wheel-type">Rubber Wheel Stop</h2>
                </div>
              </div>
              <div className="wheel-section-input">
                <div className="wheel-section-input-container">
                  <label className="wheel-section-label">Wheel Stop Quantity* </label>
                  <h1 className="wheel-note">Please select the quantity of wheel stops you want to install</h1>
                  <div className="wheel-quantity-input">
                  <select
                    name="wheel"
                    className="wheel-select"
                    value={selectedWheel}
                    onChange={(e) => setSelectedWheel(e.target.value)}>
        <option value="">Wheel Stops</option>
        </select>
        <input
          type="number"
          className="quantity-wheel-input"
          value={quantityWheel}
          onChange={handleWheelQuantityChange}
          min="1"
        />
        <button className="btn btn--full submit-wheel-quantity" type="button" onClick={handleAddWheel}>
          ADD WHEEL STOPS
        </button>
        <div className="wheel-quantity-list">
  <label className="added-wheel-label">Added Wheel Stops:</label>
  <ul>
    {addedWheel.map((wheel, index) => (
      <li className="wheel-list" key={index}>
        {wheel}
        <button className="btn btn--full removewheel-quantity" onClick={() => handleRemoveWheel(index)}>REMOVE WHEEL STOPS</button>
      </li>
    ))}
  </ul>
</div>
{errorMessage && <span className="error-message">{errorMessage}</span>}
        </div>
                  </div>
                  </div>
              </div>
    <label className="message-bollard-label">Message: </label>
    <div className="input-message-bollard-container">
    <h1 className="message-bollard-note">Tell us why you need your Bollards/Wheel Stops! Specify 
    what types of bollards or wheel stops you need here. </h1>
<textarea className="message-bollard-text" name="message" type="text" placeholder="Enter Message"
  value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
  />
  {errors.message && <span className="error-message">{errors.message}</span>}
  {submissionMessage && (
<div className="submission-message">{submissionMessage}</div> )}
<button type="button" className="btn btn--full submit-bollard" onClick={handleSubmit}>SUBMIT BOLLARD & WHEEL STOP</button>
{submissionErrorMessage &&
            <div className="submission-error-message">{submissionErrorMessage}</div>
          }
          {errorMessage &&
            <div className="submission-error-message">{errorMessage}</div>
          }
    </div>
        </div>
    </form>
  </main>
      <footer className="footer">
    <div className="site-footer__inner container container--narrow">
        <div className="footer-content">
          <img className="tbslogo" alt="TBS logo" src="../public/tbs_companies/TBS Logo1.png" />
          <ul className="footer-navigate">
        <li><a className="footer-nav-link" href="/trafficcontrol">Traffic Control</a></li>
        <li><a className="footer-nav-link" href="/trafficplanning">Traffic Control Plans</a></li>
        <li><a className="footer-nav-link-view" href="">Bollard & Wheel Stops</a></li>
        <li><a className="footer-nav-link" href="/signs">Traffic Sign Manufacturing</a></li>
        <li><a className="footer-nav-link" href="/ppe">PPE Sales</a></li>
        <li><a className="footer-nav-link" href="/rentals">Equipment Rental & Sales</a></li>
      </ul>
        </div>
        <div className="footer-contact">
            <div className="statement-box">
                <p className="statement">
                    <b className="safety-b">Safety Statement: </b>
                    At TBS, safety is our top priority. We are dedicated to ensuring the well-being of our employees, clients, 
                    and the general public in every aspect of our operations. Through comprehensive safety training, 
                    strict adherence to regulatory standards, and continuous improvement initiatives, 
                    we strive to create a work environment where accidents and injuries are preventable. 
                    Our commitment to safety extends beyond compliance—it's a fundamental value embedded in everything we do. 
                    Together, we work tirelessly to promote a culture of safety, 
                    accountability, and excellence, because when it comes to traffic control, there's no compromise on safety.
                </p>
                <p className="trademark-warning">
                  <b className="warning-trade">WARNING:</b><b> Trademark Notice</b><img className="trademark-img" src="../public/tbs_companies/TBS Logo1.png"></img> is a registered trademark of Traffic & Barrier Solutions, LLC. 
                  Unauthorized use of this logo is strictly prohibited and may result in legal action. 
                  All other trademarks, logos, and brands are the property of their respective owners.
                </p>
            </div>
            <h1 className="footer-number">706-263-0175</h1>
        </div>
    </div>
</footer>
        </div>
    )
};