import { Button, TextInput } from "flowbite-react"
import { IoPlaySharp } from "react-icons/io5"
import { SiGooglelens } from "react-icons/si"
import { Link } from "react-router-dom"

const SignUp = () => {
  return (
    <div className="min-h-screen mt-14">
      <div className="flex p-3 max-w-4xl mx-auto flex-col md:flex-row gap-20">
        {/* Left */}
        <div className="flex-1 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 rounded-lg">
          <div className="h-4/6 w-8/12 mx-16 my-16 bg-gray-50 rounded-md bg-clip-padding backdrop-blur-lg bg-opacity-30 border border-gray-100 flex flex-col justify-center items-start">
              <div className="ml-10">
                <div className="flex flex-row gap-1">
                <IoPlaySharp className="mt-2" color="white" size={24}/>
                <h1 className="text-4xl font-semibold text-white">Elevate</h1>
                </div>
                <h1 className="text-4xl font-semibold text-white">Your</h1>
                <div className="flex flex-row gap-2">
                  <h1 className="text-4xl font-bold text-indigo-950">Tech IQ</h1>
                  <h1 className="text-2xl font-semibold text-white mt-2">with</h1>
                </div>
                <h1 className="text-4xl font-bold text-indigo-950">Tech Lens.</h1>
                <p className="text-white text-sm font-semibold mt-2">Unleashing Knowledge, <br />One Byte at a Time!</p>
              </div>
            </div>
            
        </div>
        {/* Right */}
        <div className="flex-1">
          <div>
            {/* <span className="px-2 py-1">Tech</span> */}
            <SiGooglelens className="pr-2" size={40} />
          </div>
          <p className="mt-4">
            <h2 className="text-2xl font-semibold">Step into the future with Tech Lens! </h2>
            <h2 className="text-sm text-zinc-700 font-medium">Sign up now for an unparalleled tech experience.</h2>
          </p>
          <form className="mt-4">
            <div className="flex flex-col gap-3">
              <div>
                <label>Your username</label>
                <TextInput
                  type="text"
                  placeholder="Username"
                  id="username"
                />
              </div>
              
              <div>
                <label>Your email</label>
                <TextInput
                  type="text"
                  placeholder="name@company.com"
                  id="email"
                />
              </div>     

              <div>
                <label>Your password</label>
                <TextInput
                  type="text"
                  placeholder="Password"
                  id="password"
                />
              </div>

              <div>
                <Button gradientDuoTone="purpleToBlue" className="w-full hover:scale-100">
                  Sign Up
                </Button>
              </div>

              <div className="flex flex-row gap-2 mt-4">
                <p className="text-gray-500 font-medium">Already have an account?</p>
                <Link className="text-blue-600 font-medium" to={'/sign-in'} >
                  Sign In
                </Link>
              </div>
    
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
