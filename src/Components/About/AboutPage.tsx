import React from 'react';
import '../Home/Home.css';
import './About.css';

const AboutPage: React.FC = () => {
  return (
    <div>
      <div className="aboutPage">
        <div className="insideAbout">
          <h1>About the Device</h1>
          <p>
            This device aims to reduce fatalities caused by automobile accidents by
            creating an affordable collision detection and emergency response device
            that is available to all vehicle owners and does not require a monthly
            membership. 
          </p>
          <p>
            We are passionate about car technology and safety, and our effort tackles
            important technological aspects like real-time location reporting, crash
            detection, and emergency assistance requests.
          </p>
          <p>
            The device utilizes sensor technologies, including GPS modules and
            gyroscopes, to send distress signals to rescue agencies immediately after
            an accident is detected. Additionally, it features a manual activation
            button for user-initiated warnings.
          </p>
          <p>
            Our goal is to ensure the device's accuracy, dependability, and
            affordability through rigorous research, hardware and software design,
            prototyping, testing, and integration.
          </p>
          <p>
            Upon project completion, I will provide a comprehensive solution aimed
            at enhancing emergency response capabilities for all vehicle classes,
            ultimately increasing road safety and saving lives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
