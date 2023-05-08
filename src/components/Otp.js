import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import './Otp.css'

function PhoneVerificationPopup(props) {
  const { onClose } = props;
  const inputRefs = useRef([]);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputChange = (index, e) => {
    const { value } = e.target;
    if (value !== "") {
      if (/^\d+$/.test(value)) {
        setIsFilled(true);
        inputRefs.current[index].value = value;
        if (index < inputRefs.current.length - 1 && value !== "") {
          inputRefs.current[index + 1].focus();
        } 
      } else {
        inputRefs.current[index].value = ""; 
      }
    } else {
      setIsFilled(false);
    }
    
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text/plain");
    const otpArray = pasteData
      .trim()
      .split("")
      .slice(0, inputRefs.current.length);

    otpArray.forEach((digit, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = digit;
        if (index < inputRefs.current.length - 1) {
          inputRefs.current[index + 1].focus();
        }
      }
    });

    setIsFilled(
      inputRefs.current.every((ref) => ref && ref.value !== "")
    );

    e.preventDefault();
  };

  const handleKeyDown = (index, e) => {
    const { keyCode } = e;

    if (keyCode === 8 && index > 0 && !inputRefs.current[index].value) {
      inputRefs.current[index - 1].focus();
      inputRefs.current[index - 1].value = "";
    }

    if (keyCode === 37 && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    if (keyCode === 39 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    const otp = inputRefs.current.map((input) => input.value).join("");
    alert(`Your OTP is: ${otp}`);
    onClose();
  };

  return (
    <div className="popup-overlay">
    <div className="popup">
      <div className="popup-inner">
        <h2>Phone Verification</h2>
        <p>Enter the OTP you received on 12344-5XXXX</p>
        <div className="inputs-container">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="1"
              ref={(input) => (inputRefs.current[index] = input)}
              onChange={(e) => handleInputChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={(e) => handlePaste(e)}
            />
          ))}
        </div>
        <div className="mid">
          <p style={{float:'left'}}>Change Number</p>
          <p style={{float:'right'}}>Resend OTP</p>
        </div>
        <button className="verify-btn" disabled={!isFilled} onClick={handleVerify}>
          Verify
        </button>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
    </div>
  );
}

PhoneVerificationPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PhoneVerificationPopup;
