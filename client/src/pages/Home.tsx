import { Button } from "flowbite-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { BsFire, BsStars } from "react-icons/bs";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";

interface Post {
  _id: string;
  userId: string;
  content: string;
  title: string;
  image: string;
  category: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [spotLight, setSpotLight] = useState<Post>();

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await fetch(`/api/post/getPosts`);
        const data = await res.json();
        setPosts(data.posts);
        setSpotLight(data.posts[2]);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPosts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-3 mt-5">
      {/* first section*/}
      <div className="flex flex-1">
        <img src="animated.png" alt="hola" className="h-[250px]" />
        <div className="flex flex-col py-12 gap-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            TECH LENS
          </h1>
          <p className="text-3xl font-semibold ml-8">See Innovation Unfold ✨</p>
          <p className="text-lg text-gray-600 dark:text-gray-200 max-w-2xl font-semibold">
            Welcome to Tech Lens, where we explore the latest in technology and
            innovation. Our resources and articles covers a wide range of
            topics, from industry trends and best practices to in-depth guides.
          </p>
        </div>
      </div>

      {/*Second section */}
      <div className="flex flex-col lg:flex-row gap-5 mt-10">
        <div className="lg:w-3/5">
          <div className="flex flex-col">
            <div className="flex flex-row gap-2 text-black dark:text-gray-200">
              <BsStars size={30} />
              <h1 className="font-semibold text-xl">Spotlight</h1>
            </div>
            <div className="lg:mr-8 flex flex-col gap-2">
              <img
                src={spotLight?.image}
                alt="spotlight"
                className="rounded-xl object-cover mt-5"
              />
              <Link
                to={`/search?category=${spotLight && spotLight.category}`}
                className="mt-5"
              >
                <Button color="gray" pill size={"sm"}>
                  {spotLight && spotLight.category}
                </Button>
              </Link>
              <p className="text-2xl font-semibold max-w-xl">
                {spotLight?.title}
              </p>
              <span>{moment(spotLight?.createdAt).fromNow()}</span>
            </div>
          </div>
        </div>
        <div className="lg:w-2/5 px-5 flex flex-col items-center">
          <div className="flex flex-row gap-4 self-center">
            <BsFire size={30} />
            <p className="font-semibold text-xl">Trending Categories</p>
          </div>
          <div className="flex flex-col gap-3 items-center mt-5">
            <Link to={`search?category=FullStack`}>
              <Button outline>FullStack</Button>
            </Link>
            <Link to={`search?category=Devops`}>
              <Button outline>Devops</Button>
            </Link>
            <Link to={`search?category=Backend`}>
              <Button outline>Backend</Button>
            </Link>
            <Link to={`search?category=Frontend`}>
              <Button outline>Frontend</Button>
            </Link>
            <Link to={`search?category=Blockchain`}>
              <Button outline>Blockchain</Button>
            </Link>
            <Link to={`search?category=AI/ML`}>
              <Button outline>AI/ML</Button>
            </Link>
            <Link to={`search?category=Research`}>
              <Button outline>Research</Button>
            </Link>
          </div>
        </div>
      </div>

      {/*Third section*/}
      <div className="mt-8 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent bg-clip-text">
          Explore Recent Articles
        </h1>
        <div className="flex flex-wrap gap-4 mt-5 items-center justify-center">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        <Link
          to={"/search"}
          className="text-lg text-blue-500 hover:underline text-center"
        >
          View all posts
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
