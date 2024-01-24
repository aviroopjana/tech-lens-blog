import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const ThemeProvider:React.FC <{ children : React.ReactNode}> = ({children}) => {

  const  theme = useSelector((state: RootState) => state.theme.theme)

  if(theme === undefined) {
    return null;
  }

  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 dark:text-gray-100  dark:bg-[rgb(16,23,42)]">
        {children}
      </div> 
    </div>
  )
}

export default ThemeProvider