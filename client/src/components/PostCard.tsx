import React from "react";
import { Link } from "react-router-dom";

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

const PostCard: React.FC<{ post: Post}> = ({post}) => {

  return (
    <div className="mt-5 group">
        <Link to={`/post/${post.slug}`}>
          <img
            src={post.image}
            alt="image cover"
            className="h-[260px] w-full object-cover rounded-2xl group-hover:h-[200px] transition-all duration-300 z-20"
          />
        </Link>
        <div className="p-3 flex flex-col gap-2">
          <p className="text-lg font-semibold">{post.title}</p>
          <span className="italic text-sm">{post.category}</span>
          <Link to={`/post/${post.slug}`} className="text-blue-600">
            Read More
          </Link>
        </div>
    </div>
  )
}

export default PostCard