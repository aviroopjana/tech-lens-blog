import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Alert, Button, TextInput } from "flowbite-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [imageFile, setImageFile] = useState<null | File>(null);
  const [imageFileURL, setImageFileURL] = useState<string | null>(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState<
    number | null
  >(null);
  const [imageFileUploadError, setImageFileUploadError] = useState<
    string | null
  >(null);

  const filePickerRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + (imageFile?.name ?? "");
    const storageRef = ref(storage, fileName);
    if (imageFile) {
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(Number(progress.toFixed(0)));
        },
        () => {
          setImageFileUploadError(
            "Could not upload image (File must be less than 2MB)"
          );
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileURL(downloadURL);
          });
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileURL(null);
        }
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full p-3">
      <h1 className="mx-auto text-center my-8 text-3xl font-semibold dark:text-gray-300">
        Personal Information
      </h1>
      <form className="flex flex-col gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative h-32 w-32 self-center cursor-pointer"
          onClick={() => filePickerRef.current?.click()}
        >
          {imageFileUploadProgress !== null && (
            <CircularProgressbar
              value={imageFileUploadProgress}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            alt=""
            src={imageFileURL || currentUser?.profilePicture}
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>

        {imageFileUploadError && (
          <Alert color={"failure"}>{imageFileUploadError}</Alert>
        )}
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
