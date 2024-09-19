import MapLocation from "../../assets/map location.png"
import NoCosts from "../../assets/no costs.png"
import LiveLocation from "../../assets/live location.png"
import Easy from "../../assets/installation.png"
import "./Home.css";

const Home = () => {
  return (
    <div>
      <div className="home">
      <h1>Welcome to SafeGuard Alert System</h1>
      <img src={MapLocation} alt="Map Location" />
      </div>
      <div className="aboutH">
        <div className="insideAboutH">
          <h1>About the Device</h1>
          <p>
            This device aims to reduce fatalities caused by automobile accidents by
            creating an affordable collision detection and emergency response device
            that is available to all vehicle owners and does not require a monthly
            membership. 
          </p>
          <button onClick={() => window.location.href = '/about'}>Click here for more info</button>
        </div>
      </div>
      <div className="contact">
        <h1>Benefits</h1>
        <p>
          The SafeGuard Alert System is a device that can be installed in any vehicle to
          provide real-time location tracking, collision detection, and emergency
          assistance. The device is designed to reduce fatalities caused by automobile
          accidents by providing immediate assistance to drivers in distress.
        </p>
        <div className="benefits">
          <div className="image-container">
            <img src={NoCosts} alt="No Costs" />
            <h2>No Costs</h2>
            <p>
              The SafeGuard Alert System does not require a monthly subscription or
              membership fees. The device is a one-time purchase that provides
              continuous protection to vehicle owners.
            </p>
          </div>
          <div className="image-container">
            <img src={LiveLocation} alt="Live Location" />
            <h2>Real-Time Tracking</h2>
            <p>
              The device uses GPS technology to provide real-time location tracking
              for vehicles. This feature enables rescue agencies to locate drivers
              in distress quickly and accurately.
            </p>
          </div>
          <div className="image-container">
            <img src={Easy} alt="No Costs" />
            <h2>Easy installation</h2>
            <p>
              The SafeGuard Alert System can be easily installed in any vehicle
              without professional assistance. The device is designed for user-friendly
              installation and operation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
