import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button, Textarea } from "flowbite-react";

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
  onEdit: (comment: CommentType, editedContent: string) => void;
  onDelete: (id: string) => void; 
}

const baseUrl = import.meta.env.VITE_BACK_URL;

const Comment: React.FC<CommentProps> = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState<User>();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<string>(comment.content);

  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/user/${comment.userId}`);
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

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex p-4 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-12 h-12 rounded-full bg-gray-200"
          src={user?.profilePicture}
          alt={user?.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-sm truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-500 dark:text-gray-200 font-semibold pb-2">
              {comment.content}
            </p>
            <div className="flex items-center pt-2 text-sm max-w-fit gap-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 dark:text-gray-200 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-gray-400 hover:text-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(comment._id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
