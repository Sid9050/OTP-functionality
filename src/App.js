import React,{useState} from 'react';
import './App.css';
import PhoneVerificationPopup from './components/Otp.js' 

function App() {
  const [popupVisible, setPopupVisible] = useState(false);

  const handleButtonClick = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };
  return (
    <div className="App">
      <h1>To verify the phone number click on the button</h1>
      <div className='mid'>
      <button className=" btn btn-primary"  onClick={handleButtonClick}>Verify Phone</button>
      </div>
      <div className='container'>
      {popupVisible && <PhoneVerificationPopup onClose={handlePopupClose} />}
      </div>
    </div>
  );
}

export default App;
