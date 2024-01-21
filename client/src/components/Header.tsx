import { Button, Navbar, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { SiGooglelens } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const path = useLocation().pathname;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
  ];

  return (
    <Navbar className="border-b-2">
        
      <Link to={"/"} className={headerLinkStyles}>
        <span className="px-2 py-1">Tech</span>
        <SiGooglelens className="mt-3 pr-2" size={40} />
      </Link>

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
        >
          <FaMoon />
        </Button>
        <Link to={"/sign-in"}>
          <Button gradientDuoTone="purpleToBlue">SignIn</Button>
        </Link>
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

const headerLinkStyles =
  "self-center whitespace-nowrap flex items-center text-2xl sm:text-3xl font-bold dark:text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-500 focus:ring-pink-500 focus:ring-opacity-50 transition-transform hover:scale-105";
