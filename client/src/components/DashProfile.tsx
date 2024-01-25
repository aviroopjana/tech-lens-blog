import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button, TextInput } from "flowbite-react";
import { ChangeEvent, useRef, useState } from "react";

const DashProfile = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [imageFile, setImageFile] = useState<null | File>(null);
  const [imageFileURL, setImageFileURL] = useState<string | null>(null);

  const filePickerRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if( file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
    
  }
    console.log(imageFileURL, imageFile);

  return (
    <div className="max-w-lg mx-auto w-full p-3">
      <h1 className="mx-auto text-center my-8 text-3xl font-semibold dark:text-gray-300">
        Personal Information
      </h1>
      <form className="flex flex-col gap-3">
        <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className="relative h-32 w-32 self-center cursor-pointer"
        onClick={() => filePickerRef.current?.click()}>
          <img
            alt=""
            src={imageFileURL || currentUser?.profilePicture }
            className="rounded-full w-full h-full border-8 object-cover border-[lightgray]"
            
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="font-medium">Username</label>
          <TextInput
            type="text"
            placeholder=""
            defaultValue={currentUser?.username}
          />
        </div>
        <div>
          <label className="font-medium">Email</label>
          <TextInput
            type="email"
            placeholder=""
            defaultValue={currentUser?.email}
          />
        </div>
        <div>
          <label className="font-medium">Password</label>
          <TextInput
            type="text"
            placeholder="********"
            defaultValue={"********"}
          />
        </div>

        <Button
          type="submit"
          gradientDuoTone={"purpleToBlue"}
          outline
          className="mt-2"
        >
          Save
        </Button>

        <div className="flex justify-between mt-2">
          <span className="text-red-600 font-semibold cursor-pointer">
            Delete Account
          </span>
          <span className="text-red-600 font-semibold cursor-pointer">
            Sign Out
          </span>
        </div>
      </form>
    </div>
  );
};

export default DashProfile;
