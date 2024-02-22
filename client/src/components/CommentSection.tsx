import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import { Button, Textarea } from "flowbite-react";
import { useState } from "react";

const CommentSection = ({ postId }: { postId: string }) => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({content: comment, postId, userId: currentUser?._id})
      });

      const data = await res.json();
      console.log(data);
      if(res.ok) {
        setComment('');
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-3xl p-3 mx-auto w-full">
      {currentUser ? (
        <div className="flex flex-1 items-center gap-2 my-5 text-gray-400 text-sm">
          <p>Signed in as:</p>
          <img
            src={currentUser.profilePicture}
            alt=""
            className="h-5 w-5 object-cover rounded-full"
          />
          <Link to={"/dashboard?tab=profile"} className="text-cyan-600 hover:underline">@{currentUser.username}</Link>
        </div>
      ) : (
        <div className="text-sm flex gap-2 my-5">
            <p className="text-gray-400">You must be signed in to comment.</p>
            <Link to={'/sign-in'} className="text-teal-500 hover:underline">
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
                <p className="text-gray-500">{300 - comment.length} characters remaining</p>
                <Button outline gradientDuoTone={'purpleToPink'} type="submit">Submit</Button>
            </div>
        </div>
      </form>
      )}
    </div>
  );
};
 
export default CommentSection;
