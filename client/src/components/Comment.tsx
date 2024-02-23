import moment from "moment";
import { useEffect, useState } from "react";

interface CommentType {
  content: string;
  userId: string;
  postId: string;
  likes: Array<number>;
  numberOfLikes: number;
  createdAt: string;
}

interface User {
  createdAt: string;
  email: string;
  isAdmin: boolean;
  profilePicture: string;
  updatedAt: string;
  username: string;
  _id: string;
}

const Comment = ({ comment }: { comment: CommentType }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);

  return (
    <div className="flex gap-4 mb-5">
      <div className="">
        <img
          src={user && user.profilePicture}
          className="h-12 w-12 rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <div>
          <span className="font-bold text-sm mr-1">
            @{user && user.username}
          </span>
          <span className="text-gray-500 text-xs font-bold">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <div className="text-sm font-medium">{comment.content}</div>
      </div>
    </div>
  );
};

export default Comment;
