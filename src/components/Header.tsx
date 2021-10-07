
import { Link } from 'react-router-dom';
import logo from '../img/logo.png'
function Header() {
    return (
      <nav className="navbar navbar-info bg-info">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/" >
            <img src={logo} alt="" width="30" height="24" className="d-inline-block align-text-top mx-2"></img>
            Weather App
          </Link>
        </div>
      </nav>
    );
  }
  
  export default Header;