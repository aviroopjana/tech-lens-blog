import { Button } from "flowbite-react"
import { FcGoogle } from "react-icons/fc"
import { useLocation } from "react-router-dom";

const OAuth = () => {
  const path = useLocation().pathname;

  return (
    <Button type="button" gradientDuoTone={"pinkToOrange"} outline>
      <FcGoogle className="h-6 w-6 mr-2"/>
      <span className="text-[15px]">
        {path === '/sign-up' ? 'Sign Up with Google' : 'Sign In with Google'}
      </span>
    </Button>
  );
}

export default OAuth;
