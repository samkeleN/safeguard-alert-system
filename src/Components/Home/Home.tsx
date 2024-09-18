import MapLocation from "../../assets/map location.png"
import "./Home.css";
const Home = () => {
  return (
    <div>
      <div className="home">
      <h1>Welcome to SafeGuard Alert System</h1>
      <img src={MapLocation} alt="Map Location" />
      </div>
    </div>
  );
};

export default Home;
