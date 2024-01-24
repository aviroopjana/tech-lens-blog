import { Sidebar } from "flowbite-react";
import { useState, useEffect } from "react";
import { GoSignOut } from "react-icons/go";
import { HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState<string>();

  useEffect(() => {
    const urlSearch = new URLSearchParams(location.search);
    const tabUrl = urlSearch.get("tab");
    console.log(tabUrl);
    if (tabUrl) {
      setTab(tabUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="rounded-lg w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        <Link to={'/dashboard?tab=profile'}>
          <Sidebar.Item active={tab === "profile"} icon={HiUser} label="User">
            Profile
          </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={GoSignOut}>LogOut</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
