import { SiGooglelens } from "react-icons/si"
import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link to={"/"} className={headerLinkStyles}>
        <span className="px-2 py-1">Tech</span>
        <SiGooglelens className="mt-3 pr-2" size={40} />
      </Link>
  )
}

export default Logo;

const headerLinkStyles =
  "self-center whitespace-nowrap flex items-center text-2xl sm:text-3xl font-bold dark:text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-500 focus:ring-pink-500 focus:ring-opacity-50 transition-transform hover:scale-105";