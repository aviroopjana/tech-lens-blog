import { Alert, Button, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { IoPlaySharp } from "react-icons/io5";
import { SiGooglelens } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("All the fields are required");
      return;
    }
    console.log("Submitting form data");
    try {
      setLoading(true);
      setErrorMessage("");

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message);
      } else {
        setLoading(false);
        navigate('/sign-in');
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
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
            {/* <span className="px-2 py-1">Tech</span> */}
            <SiGooglelens className="pr-2" size={40} />
          </div>
          <p className="mt-4">
            <h2 className="text-2xl font-semibold">
              Step into the future with Tech Lens!{" "}
            </h2>
            <h2 className="text-sm text-zinc-700 dark:text-gray-400 font-medium">
              Sign up now for an unparalleled tech experience.
            </h2>
          </p>

          <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div>
              <label>Your username</label>
              <TextInput
                type="text"
                placeholder="username"
                id="username"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Your email</label>
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Your password</label>
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                onChange={handleChange}
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
                  <span className="text-[15px]">Sign Up</span>
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
                Already have an account?
              </p>
              <Link className="text-blue-600 font-medium" to={"/sign-in"}>
                Sign In
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
