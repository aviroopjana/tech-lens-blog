import { Sidebar } from "flowbite-react";
import { useState, useEffect } from "react";
import { GoSignOut } from "react-icons/go";
import { HiDocumentText, HiUser } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { RootState } from "../redux/store";

const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState<string>();

  const { currentUser } = useSelector((state: RootState) => state.user);

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
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser?.isAdmin ? 'Admin' : 'User'}
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Link to={"/dashboard?tab=posts"}>
            <Sidebar.Item
              active={tab === "posts"}
              icon={HiDocumentText}
              as="div"
            >
              Posts
            </Sidebar.Item>
          </Link>
          <Sidebar.Item
            icon={GoSignOut}
            className={"cursor-pointer"}
            onClick={handleSignout}
          >
            LogOut
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
