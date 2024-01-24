import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { RootState } from "../redux/store";


const Header = () => {
  const path = useLocation().pathname;
  const dispath = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.user);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
  ];

  return (
    <Navbar className="border-b-2">
      <Logo/>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden md:inline"
        />
      </form>

      <Button className="w-8 md:w-12 h-8 md:h-10 md:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-2 md:gap-2 lg:gap-3 md:order-2">
        <Button
          className="w-8 md:w-12 h-8 md:h-10 sm:inline hidden "
          color="gray"
          pill
          onClick={() => dispath(toggleTheme())}
        >
          <FaMoon />
        </Button>
         { currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
              alt="user"
              img={currentUser.profilePicture}
              rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>
                Profile
              </Dropdown.Item>
            </Link>              
            <Dropdown.Divider/>
            <Dropdown.Item>
              Sign Out
            </Dropdown.Item>
          </Dropdown>
         ) : (
          <Link to={"/sign-in"}>
          <Button gradientDuoTone="purpleToBlue">SignIn</Button>
        </Link>
         ) }
        
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        {navLinks.map((navLink) => (
            <Navbar.Link key={navLink.label} as={"div"} active={path === navLink.path}>
                <Link to={navLink.path}>
                    {navLink.label}
                </Link>
            </Navbar.Link>
        ))}
      </Navbar.Collapse>

    </Navbar>
  );
};

export default Header;


