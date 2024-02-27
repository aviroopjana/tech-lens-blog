import {
  StorageError,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  Alert,
  Button,
  FileInput,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import { useNavigate } from "react-router-dom";

interface formDataState {
  title?: string;
  image?: string;
  category?: string;
  content?: string;
}

const baseUrl = import.meta.env.VITE_BACK_URL;


const CreatePost = () => {
  const editor = useRef(null);
  // const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [imageUploadProgress, setImageUploadProgress] = useState<number | null>(
    null
  );
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [formData, setFormData] = useState<formDataState>({});
  const [publishError, setPublishError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image first");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(Number(progress.toFixed(0)));
        },
        (error: StorageError) => {
          const errorMessage =
            error.message || "An error occurred during image upload";
          setImageUploadError(errorMessage);
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setImageUploadError(null);
            setImageUploadProgress(null);
            setFormData({ ...formData, image: downloadUrl });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`${baseUrl}/api/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.savedPost.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl p-3 min-h-screen mx-auto">
      <div className="flex flex-col">
        <h1 className="text-3xl text-center font-semibold my-7">
          Create New Blog Post
        </h1>
        <h1 className="text-lg text-center font-medium text-gray-400 mt-2 hidden sm:inline">
          Note: All content that you add in your blog post must be original
          content. All acknowledgements of source references must be ensured
        </h1>
        <form className="flex flex-col mt-5 gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="title" value="Blog title" className="text-lg" />
              <TextInput
                id="title"
                placeholder="Title"
                required
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="category"
                value="Choose a topic"
                className="text-lg"
              />
              <Select
                id="category"
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value={"Uncategorized"}>Select a category</option>
                <option value={"FullStack"}>FullStack</option>
                <option value={"Devops"}>Devops</option>
                <option value={"Frontend"}>Frontend</option>
                <option value={"Backend"}>Backend</option>
                <option value={"Blockchain"}>Blockchain</option>
                <option value={"AI/ML"}>AI/ML</option>
                <option value={"Research"}>Research</option>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label value="Upload a suitable image" className="text-lg" />
            <div className="flex gap-4 items-center justify-between border-4 border-teal-400 border-dotted p-3">
              <FileInput
                typeof="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
              <Button
                gradientDuoTone={"purpleToBlue"}
                outline
                onClick={handleUploadImage}
              >
                {" "}
                {imageUploadProgress ? (
                  <div className="h-16 w-16">
                    <CircularProgressbar
                      value={imageUploadProgress}
                      text={`${imageUploadProgress || 0}%`}
                    />
                  </div>
                ) : (
                  "Upload Image"
                )}
              </Button>
            </div>
            {imageUploadError && (
              <Alert color={"failure"}>{imageUploadError}</Alert>
            )}
            {formData.image && (
              <img
                src={formData.image}
                alt="upload"
                className="w-full h-72 object-contain"
              />
            )}
          </div>
          {/* <ReactQuill
            theme="snow"
            placeholder=" Write your blog here..."
            className="h-72 mb-12"
          /> */}
          <div className="flex flex-col gap-2 mb-12">
            <Label value="Blog content" className="text-lg" />
            {/* <JoditEditor
              ref={editor}
              value={content}
              config={{ theme: "dark" }}
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(content) => setFormData({ ...formData, content: content })}
            /> */}
            <JoditEditor
              ref={editor}
              value={formData.content || ""}
              config={{ theme: "dark" }}
              onBlur={(newContent) =>
                setFormData({ ...formData, content: newContent })
              }
            />
          </div>
          <Button
            className="mt-2"
            gradientDuoTone={"purpleToBlue"}
            outline
            type="submit"
          >
            Submit
          </Button>
          {publishError && (
            <Alert className="mt-5" color={"failure"}>
              {publishError}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
