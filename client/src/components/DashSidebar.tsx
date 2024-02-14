import { Sidebar } from "flowbite-react";
import { useState, useEffect } from "react";
import { GoSignOut } from "react-icons/go";
import { HiUser } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";

const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState<string>();

  useEffect(() => {
    const urlSearch = new URLSearchParams(location.search);
    const tabUrl = urlSearch.get("tab");
    console.log(tabUrl);
    if (tabUrl) {
      setTab(tabUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        window.location.href = "/sign-in";
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="rounded-lg w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        <Link to={'/dashboard?tab=profile'}>
          <Sidebar.Item active={tab === "profile"} icon={HiUser} label="User" as="div">
            Profile
          </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={GoSignOut} className={'cursor-pointer'} onClick={handleSignout}>LogOut</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
