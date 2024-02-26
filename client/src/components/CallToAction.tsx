import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <div className="p-3 flex flex-col md:flex-row rounded-xl border-2 border-gray-200">
      <div className="p-7 flex flex-col gap-5">
        <h1 className="text-2xl font-semibold">
          Want to be a 100X Developer for FREE?? 
        </h1>
        <p className="text-gray-500 font-medium">
          Why not checking out these awesome courses, on FreeCodeCamp by top
          instructors suggested by our expert to grow your career!
        </p>
        <Button gradientDuoTone={"purpleToPink"}>
          <a
            href="https://www.freecodecamp.org/learn"
            target="_blank"
            rel="noopener noreferrer"
          >
            visit the course
          </a>
        </Button>
      </div>
      <div className="p-3">
        <img
          src="https://cdn.freecodecamp.org/platform/universal/fcc_meta_1920X1080-indigo.png"
          className="rounded-xl h-[240px] w-[650px]"
        />
      </div>
    </div>
  );
};

export default CallToAction;
