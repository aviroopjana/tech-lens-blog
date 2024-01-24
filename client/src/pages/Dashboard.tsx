import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";

const Dashboard = () => {

  const location = useLocation();
  const [tab,setTab] = useState<string>();

  useEffect(() => {
    const urlSearch = new URLSearchParams(location.search);
    const tabUrl = urlSearch.get('tab');
    console.log(tabUrl);
    if(tabUrl) {
      setTab(tabUrl)
    }
  },[location.search])

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/*Dashboard Sidebar */}
        <DashSidebar/>
      </div>
      {/*Dashboard Profile */}
      {tab === 'profile' && <DashProfile/>}
    </div>
  )
}

export default Dashboard