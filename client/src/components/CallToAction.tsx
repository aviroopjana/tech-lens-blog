import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <div className="p-3 flex flex-col md:flex-row rounded-xl border-2 border-gray-200">
      <div className="p-7 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">
          Want to learn more about Devops?
        </h1>
        <p className="text-gray-500 font-medium">
          Why not checking out these awesome courses, on Udemy by top
          instructors suggested by our expert to grow your career!
        </p>
        <Button gradientDuoTone={"purpleToPink"}>
          <a
            href="https://www.udemy.com/course/docker-mastery/?couponCode=24T4FS22124"
            target="_blank"
            rel="noopener noreferrer"
          >
            visit the course
          </a>
        </Button>
      </div>
      <div className="p-3">
        <img
          src="https://img-b.udemycdn.com/course/750x422/1035000_c1aa_7.jpg"
          className="rounded-xl"
        />
      </div>
    </div>
  );
};

export default CallToAction;
