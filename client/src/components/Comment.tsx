import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface CommentType {
  content: string;
  userId: string;
  postId: string;
  likes: Array<string>;
  numberOfLikes: number;
  createdAt: string;
  _id: string;
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

interface CommentProps {
  comment: CommentType;
  onLike: (id: string) => void;
}

const Comment: React.FC<CommentProps> = ({ comment, onLike }) => {
  const [user, setUser] = useState<User>();

  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
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
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => onLike(comment._id)}
            className={`text-gray-400 hover:text-blue-500 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              'text-blue-500'
          }`}
          
          >
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-gray-400 text-sm">
            {comment.numberOfLikes > 0 && comment.numberOfLikes + ' ' + (comment.numberOfLikes === 1 ? 'like' : 'likes')}
          </p>
        </div>
      </div>
    </div>
  );
};
 
export default Comment;
