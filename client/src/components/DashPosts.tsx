import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Table, TableHeadCell } from "flowbite-react";
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

const DashPosts = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [userPosts, setUserPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `/api/post/getPosts?userId=${currentUser?._id}`
        );
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setUserPosts(data.posts);
        }
        console.log(userPosts);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser?.isAdmin) {
      fetchPosts();
    }
  }, [currentUser?._id]);

  return (
    <div className="table-auto md:overflow-x-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser?.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <TableHeadCell>Date Updated</TableHeadCell>
              <TableHeadCell>Post Image</TableHeadCell>
              <TableHeadCell>Post Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className="divide-y" key={post._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-10 w-20 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/post/${post.slug}`}
                      className="font-medium text-gray-900 dark:text-white"
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>{post.category}</Link>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-red-500 font-medium hover:underline cursor-pointer">
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="text-teal-500 font-medium hover:underline cursor-pointer">
                      Edit
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
    </div>
  );
};

export default DashPosts;
