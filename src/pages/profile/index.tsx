import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getComments } from "../../redux/comment/action";
import dayjs from "dayjs";
import { getCommentsParamsByUsers } from "../../utils/helpers";
import Pagination from "../../components/Pagination";
import Layout from "../../components/Layout";

const ProfilePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { authData } = useSelector((state: RootState) => state.auth);
  const { comments, loading } = useSelector((state: RootState) => state.comment);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (authData.user.id) {
      void dispatch(getComments(getCommentsParamsByUsers(authData.user.id, page)));
    }
  }, [dispatch, authData.user.id, page]);

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-primary-dark text-center my-4">Profile</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <p><strong>Username:</strong> {authData.user.username}</p>
          <p><strong>Email:</strong> {authData.user.email}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-primary-dark mb-4 text-center">Comment Activity</h2>
          {comments.data.length > 0 ? (
            comments.data.map((comment) => (
              <div key={comment.id} className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg shadow-lg mb-4 transition-transform transform hover:scale-105 hover:shadow-xl">
                <p className="text-base text-gray-800">{comment.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {dayjs(comment.createdAt).fromNow()} on Article: {comment?.article?.title}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              {
                loading ? "Loading..." : "No comment found"
              }
            </p>
          )}
          {
            comments.data.length > 0 && (
              <Pagination
                currentPage={page}
                totalPages={comments.meta.pagination.pageCount}
                onPageChange={setPage}
              />
            )
          }
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;