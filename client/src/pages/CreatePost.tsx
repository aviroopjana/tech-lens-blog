import { Button, FileInput, Label, Select, TextInput } from "flowbite-react";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

const CreatePost = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

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
        <form className="flex flex-col mt-5 gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="title" value="Blog title" className="text-lg" />
              <TextInput id="title" placeholder="Title" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="category"
                value="Choose a topic"
                className="text-lg"
              />
              <Select id="category">
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
              <FileInput typeof="file" accept="image/*" />
              <Button gradientDuoTone={"purpleToBlue"} outline>
                {" "}
                Upload Image
              </Button>
            </div>
          </div>
          {/* <ReactQuill
            theme="snow"
            placeholder=" Write your blog here..."
            className="h-72 mb-12"
          /> */}
          <div className="flex flex-col gap-2 mb-12">
            <Label value="Blog content" className="text-lg"/>
            <JoditEditor
            ref={editor}
            value={content}
            config={{theme: 'dark'}}
            //tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            //onChange={newContent => {}}
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
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
