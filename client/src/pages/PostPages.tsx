import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CalltoAction";

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

const PostPages = () => {
  const { postSlug } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getPosts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setLoading(false);
        } else {
          setPost(data.posts[0]);
          setError(false);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size={"xl"} />
      </div>
    );
  }

  return (
    <main className="p-3 mx-auto max-w-6xl lg:max-w-4xl flex flex-col min-h-screen">
      <h1 className="mt-10 p-3 text-center text-3xl font-serif lg:text-4xl mx-auto max-w-2xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="mt-5 self-center"
      >
        <Button color="gray" pill size={"xs"}>
          {post && post.category}
        </Button>
      </Link>
      <img src={post && post.image} className="mt-5 p-3 max-h-[600px] w-full lg:max-w-[550px] self-center object-cover"/>
      <div className="flex justify-between p-3 border-b border-slate-500 max-w-2xl mx-auto text-xs w-full">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{post && (post.content.length/1000).toFixed(0)} mins read</span>
      </div>
      <div dangerouslySetInnerHTML={{__html: post?.content ?? ""}} className="max-w-2xl mx-auto w-full p-3 post-content">
      </div>
      <div className="max-w-4xl w-full mx-auto">
        <CallToAction/>
      </div>
    </main>
  );
};

export default PostPages;
