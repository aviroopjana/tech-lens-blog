import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

const DashProfile = () => {
  const { currentUser, error, loading }: RootState['user'] = useSelector(
    (state: RootState) => state.user
  );

  const [imageFile, setImageFile] = useState<null | File>(null);
  const [imageFileURL, setImageFileURL] = useState<string | null>(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState<
    number | null
  >(null);
  const [imageFileUploadError, setImageFileUploadError] = useState<
    string | null
  >(null);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState<string | null>(
    null
  );
  const [updateUserError, setUpdateUserError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  const filePickerRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User updated successfully!!");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

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
            setFormData({ ...formData, profilePicture: downloadURL });
          });
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileURL(null);
        }
      );
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser?._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
        window.location.href = "/sign-in";
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

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
    <div className="max-w-lg mx-auto w-full p-3">
      <h1 className="mx-auto text-center my-8 text-3xl font-semibold dark:text-gray-300">
        Personal Information
      </h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
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
            id="username"
            placeholder=""
            defaultValue={currentUser?.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="font-medium">Email</label>
          <TextInput
            id="email"
            type="email"
            placeholder=""
            defaultValue={currentUser?.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="font-medium">Password</label>
          <TextInput
            id="password"
            type="text"
            placeholder="********"
            defaultValue={"********"}
            onChange={handleChange}
          />
        </div>
        <Button
          type="submit"
          gradientDuoTone={"purpleToBlue"}
          outline
          className="mt-2"
          disabled={loading || imageFileUploadProgress !== null}
        >
          {loading || imageFileUploadProgress !== null
            ? "Loading..."
            : "Update"}
        </Button>
        {currentUser?.isAdmin && (
          <Link to={"/create-post"}>
            <Button gradientDuoTone={"purpleToBlue"} outline className="mt-2 w-full">
              Create Post
            </Button>
          </Link>
        )}

        <div className="flex justify-between mt-2">
          <span
            className="text-red-600 font-semibold cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            Delete Account
          </span>
          <span
            className="text-red-600 font-semibold cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </span>
        </div>
        {updateUserSuccess && (
          <Alert color={"success"} className="mt-5">
            {updateUserSuccess}
          </Alert>
        )}
        {updateUserError && (
          <Alert color={"failure"} className="mt-5">
            {updateUserError}
          </Alert>
        )}
        {error && (
          <Alert color={"failure"} className="mt-5">
            {error}
          </Alert>
        )}
        {showModal && (
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            size={"md"}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="h-14 w-14 text-gray-700 dark:text-gray-400 mb-4 mx-auto" />
                <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400 text-center">
                  Are you sure? You want to delete your account.
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={handleDeleteUser}>
                    Yes, I'm sure
                  </Button>
                  <Button color="gray" onClick={() => setShowModal(false)}>
                    No, Cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        )}
      </form>
    </div>
  );
};

export default DashProfile;
