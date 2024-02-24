import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface CommentType {
  _id: string;
  content: string;
  userId: string;
  postId: string;
  likes: Array<string>;
  numberOfLikes: number;
  createdAt: string;
}

interface CommentSectionProps {
  postId?: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [comment, setComment] = useState("");
  const [recievedComments, setRecievedComments] = useState<CommentType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [commentToDelete, setCommentToDelete] = useState<string>();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser?._id,
        }),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setComment("");
        setRecievedComments([data, ...recievedComments]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (!postId) {
          console.log("postId is missing!");
        }
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        const data = await res.json();
        setRecievedComments(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleLike = async (commentId: string) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }

      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });

      const data = await res.json();

      if (res.ok) {
        setRecievedComments(
          recievedComments.map((existingComment) => {
            if (existingComment._id === commentId) {
              return {
                ...existingComment,
                likes: data.likes,
                numberOfLikes: data.numberOfLikes,
              };
            }
            return existingComment;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (comment: { _id: string; }, editedContent: string) => {
    setRecievedComments(
      recievedComments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId: string) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setRecievedComments(recievedComments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-3xl p-4 mx-auto w-full">
      {currentUser ? (
        <div className="flex flex-1 items-center gap-2 my-5 text-gray-400 text-sm">
          <p>Signed in as:</p>
          <img
            src={currentUser.profilePicture}
            alt=""
            className="h-5 w-5 object-cover rounded-full"
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-cyan-600 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="text-sm flex gap-2 my-5">
          <p className="text-gray-400">You must be signed in to comment.</p>
          <Link to={"/sign-in"} className="text-teal-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}

      {/* Comment Box */}
      {currentUser && (
        <form onSubmit={handleSubmit}>
          <div className="p-5 border border-teal-600 rounded-lg">
            <Textarea
              placeholder="Add a comment here..."
              rows={4}
              maxLength={300}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <div className="mt-5 flex items-center justify-between">
              <p className="text-gray-500">
                {300 - comment.length} characters remaining
              </p>
              <Button outline gradientDuoTone={"purpleToPink"} type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      )}

      {recievedComments.length === 0 ? (
        <p>No comments on this post yet.</p>
      ) : (
        <>
          <div className="flex gap-2 my-5 items-center font-semibold">
            {recievedComments.length}
            <p className="text-base">
              {recievedComments.length === 1 ? "Comment" : "Comments"}
            </p>
          </div>
          {recievedComments.map((comment) => (
            <Comment key={comment._id} comment={comment} onLike={handleLike} onEdit={handleEdit} onDelete={(commentId) => {
              setShowModal(true);
              setCommentToDelete(commentId);
            }}
            />
          ))}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this comment?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button
                color='failure'
                onClick={() => commentToDelete && handleDelete(commentToDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CommentSection;
