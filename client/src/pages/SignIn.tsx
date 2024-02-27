import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import { useState, ChangeEvent, FormEvent } from "react";
import { IoPlaySharp } from "react-icons/io5";
import { SiGooglelens } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInFailure, signInSuccess, ApiResponse } from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import OAuth from "../components/OAuth";

interface FormData {
  email: string;
  password: string;
}

const baseUrl = import.meta.env.VITE_BACK_URL;

export default function SignIn() {
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const { loading, error: errorMessage } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatch(signInFailure("All the fields are required"));
      return;
    }

    try {
      dispatch(signInStart());
      const res = await fetch(`${baseUrl}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await res.json();

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-14">
      <div className="flex p-3 max-w-4xl mx-auto flex-col md:flex-row gap-20">
        {/* Left */}
        <div className="hidden sm:inline flex-1 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 rounded-lg">
          <div className="h-4/6 w-8/12 mx-16 my-16 bg-gray-50 rounded-md bg-clip-padding backdrop-blur-lg bg-opacity-30 border border-gray-100 flex flex-col justify-center items-start ">
            <div className="ml-10">
              <div className="flex flex-row gap-1">
                <IoPlaySharp className="mt-2" color="white" size={24} />
                <h1 className="text-4xl font-semibold text-white">Elevate</h1>
              </div>
              <h1 className="text-4xl font-semibold text-white">Your</h1>
              <div className="flex flex-row gap-2">
                <h1 className="text-4xl font-bold text-indigo-950">Tech IQ</h1>
                <h1 className="text-2xl font-semibold text-white mt-2">with</h1>
              </div>
              <h1 className="text-4xl font-bold text-indigo-950">Tech Lens.</h1>
              <p className="text-white text-sm font-semibold mt-2">
                Unleashing Knowledge, <br />
                One Byte at a Time!
              </p>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="flex-1">
          <div>
            <SiGooglelens className="pr-2" size={40} />
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold">
              Welcome back to Tech Lens!{" "}
            </h2>
            <h2 className="text-sm text-zinc-700 dark:text-gray-400 font-medium">
              Sign in below to get started with your account
            </h2>
          </div>

          <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
              <label>Your email</label>
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
                autoComplete="username"
              />
            </div>

            <div>
              <label>Your password</label>
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>

            <div>
              <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                disabled={loading}
                className="w-full mt-4"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  <span className="text-[15px]">Sign In</span>
                )}
              </Button>
            </div>

            <div className="flex items-center">
              <hr className="flex-1 border-t border-gray-300"/>
              <span className="mx-4 text-gray-500">OR</span>
              <hr className="flex-1 border-t border-gray-300"/>
            </div>

            <OAuth/>

            <div className="flex flex-row gap-2">
              <p className="text-gray-500 dark:text-gray-300 font-medium">
                New to Tech Lens?
              </p>
              <Link className="text-blue-600 font-medium" to={"/sign-up"}>
                Register here
              </Link>
            </div>
            {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
          </form>
        </div>
      </div>
    </div>
  );
}
