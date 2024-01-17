import React, { useContext, useEffect, useState } from "react";
import "./Sidenav.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import ChatIcon from "@mui/icons-material/Chat";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import QrCodeIcon from '@mui/icons-material/QrCode';
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { IconLayout2 } from "@tabler/icons-react";  
import UserContext from "../../context/UserContext";
import LanguageToggle from "../LangaugeToggle";
import rajpolice from "../../../public/assets/rajPoliceLogo.jpg"

function Sidenav() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  

  const context = useContext(UserContext);
  const { User, getUserInfo } = context;

  const handleOptionSelect = (option) => {
    if (option === '/account/logout') {
      localStorage.removeItem('token');
      navigate('/account/signin');
    }else{
      const route = `${option}`
      navigate(route);
    }
    
    setShowDropdown(false);
  }


  useEffect(() => {
      (async () => {
          if (localStorage.getItem('token')) {
              await getUserInfo()
          }
          else {
              navigate('/account/signin');
          }

      })()
  }, [])


  return (
    <div className="sidenav">
      <img
        className="sidenav__logo mx-auto my-12"
        src={rajpolice}
        alt="Logo"
      />
      {/* <LanguageToggle /> */}
      <div className="sidenav__buttons">
        <Link className="sidenav__button lg:ps-12" to="/">
          <HomeIcon />
          <span >Home</span>
        </Link>
        {/* <Link className="sidenav__button lg:ps-12" to="/feed">
          <IconLayout2 />
          <span>Feed</span>
        </Link> */}
        <Link className="sidenav__button lg:ps-12" to="/search">
          <SearchIcon />
          <span>Search</span>
        </Link>
        <Link className="sidenav__button lg:ps-12" to="/search">
          <ExploreIcon />
          <span className="">Feedback</span>
        </Link>
        <Link className="sidenav__button lg:ps-12" to={'/message'}>
          <ChatIcon />
          <span>Messages</span>
        </Link>
        <Link className="sidenav__button lg:ps-12" to='/createpost'>
          <AddCircleOutlineIcon />
          <span>Create Post</span>
        </Link>
        <button className="sidenav__button lg:ps-12">
          <QrCodeIcon />
          <span>Scan QR</span>
        </button>
        <button className="sidenav__button m-0 lg:ps-12">
          <Avatar className="scale-75">
            {User.firstName ? User.firstName.charAt(0).toUpperCase() : "A"}
          </Avatar> <span className="ms-2 inline">{User.firstName}</span>

        </button>
      </div>
      <div className="sidenav__more dropdown-container mt-auto">
        <button className="sidenav__button dropdown-button lg:ps-12" onClick={() => setShowDropdown(!showDropdown)}>
          <MenuIcon />
          <span className="sidenav__buttonText">More</span>
        </button>
        {showDropdown && (
          <div className="dropdown-options absolute bottom-12 left-24 bg-gray-900 text-center">
            <button className="w-full border rounded hover:bg-gray-600" onClick={() => handleOptionSelect('/account/signup')}>New SignUp</button>
            <button className="w-full border rounded hover:bg-gray-600" onClick={() => handleOptionSelect('/account/signin')}>New SignIn</button>
            <button className="w-full border rounded hover:bg-gray-600" onClick={() => handleOptionSelect('/account/logout')}>Logout</button>
            {/* Add more options as needed */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidenav;