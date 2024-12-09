import React, { useState } from 'react';
import dayjs from 'dayjs';
import { IArticle, IArticlePayload } from '../redux/articles/types';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { deleteArticle, updateArticle } from '../redux/articles/action';
import { createComment, deleteComment, getComments, updateComment } from '../redux/comment/action';
import { useForm } from 'react-hook-form';
import { ICommentPayload } from '../redux/comment/types';
import { getCommentsParamsByArticle } from '../utils/helpers';
import ModalArticle from './ModalArticle';
import { IAuthData } from '../redux/auth/types';

interface ArticleCardProps {
  article: IArticle;
  isAuthenticated: boolean;
  authData: IAuthData;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, isAuthenticated, authData }) => {
  const dispatch: AppDispatch = useDispatch();
  const { comments, loading, loadingUpdate } = useSelector((state: RootState) => state.comment);
  const [showCommentId, setShowCommentId] = useState<string | number>('');
  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);
  const [editComment, setEditComment] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit: handleSubmitComment, reset } = useForm<ICommentPayload>({
    defaultValues: {
      content: '',
    },
  });

  const editCommentForm = useForm<ICommentPayload>({
    defaultValues: {
      content: '',
    },
  });

  const toggleDropdown = (id: string) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      void dispatch(deleteArticle(id));
    }
  }

  const handleEdit = async (data: IArticlePayload) => {
    const res = await dispatch(updateArticle({ article: {...data, cover_image_url: article.cover_image_url}, id: article.documentId }));
    if (res.meta.requestStatus === 'fulfilled') {
      setShowModal(false);
    }
  }

  const handleAddComment = async (data: ICommentPayload, id: number) => {
    const res = await dispatch(createComment({ payload: { ...data, article: id }, params: getCommentsParamsByArticle(id) }));
    if (res.meta.requestStatus === 'fulfilled') {
      reset();
    } else if (res.meta.requestStatus === 'rejected') {
      if ('error' in res) {
        alert(res.error?.message ?? 'An error occurred');
      }
    }
  }

  const handleEditComment = async (data: ICommentPayload, id: number) => {
    const res = await dispatch(updateComment({ payload: { ...data, documentId: editComment }, params: getCommentsParamsByArticle(id) }));
    if (res.meta.requestStatus === 'fulfilled') {
      setEditComment('');
      editCommentForm.reset();
    } else if (res.meta.requestStatus === 'rejected') {
      if ('error' in res) {
        alert(res.error?.message ?? 'An error occurred');
      }
    }
  }

  const handleViewComments = (id: string | number) => {
    setShowCommentId(showCommentId === id ? '' : id);
    void dispatch(getComments(getCommentsParamsByArticle(id)));
  }

  const handleDeleteComment = async (idComment: string, idArticle: number | string) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      await dispatch(deleteComment({
        id: idComment,
        params: getCommentsParamsByArticle(idArticle),
      }));
    }
  }

  return (
    <div key={article.id} className="mx-auto bg-white border rounded-lg shadow-lg overflow-hidden lg:w-[50%] mb-2 min-h-[50vh]">
      <div className="p-4">
        <div className='flex justify-between items-center'>
          <h2 className="font-semibold text-lg">{article.title}</h2>
          {isAuthenticated && article?.user?.id === authData?.user?.id &&
            <div className="relative">
              <button 
                onClick={() => toggleDropdown(article.documentId)}
                className="hover:bg-gray-100 p-2 rounded-full"
              >
                &#x22EE;
              </button>
              {dropdownVisible === article.documentId && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-lg"
                    onClick={() => setShowModal(true)}
                  >
                    Edit
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-lg"
                    onClick={() => handleDelete(article.documentId)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          }
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {dayjs(article.publishedAt).fromNow()}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          {article.description}
        </p>
      </div>
      <div>
        <img
          src={article.cover_image_url}
          alt={article.title}
          className="object-cover w-full"
        />
      </div>
      <p
        className='p-4 text-sm text-gray-400 text-right cursor-pointer hover:text-blue-500'
        onClick={() => handleViewComments(article.id)}
      >
        {article?.comments?.length} comments
      </p>
      {
        showCommentId === article.id && (
          <div className='p-4'>
            {isAuthenticated && (
              <form onSubmit={(e) => void handleSubmitComment((data) => handleAddComment(data, article.id))(e)} className='mb-4'>
                <textarea
                  className='w-full p-2 border rounded-lg'
                  placeholder='Add a comment...'
                  {...register('content', { required: true })}
                />
                <div className='flex justify-end'>
                  <Button 
                    type='submit'
                    title='Add Comment' 
                    className='w-40'
                    loading={loading}
                  />
                </div>
              </form>
            )}
            {!loading && comments?.data.map((comment) => (
              <div key={comment.id} className='bg-gray-100 p-2 rounded-lg mb-2'>
                {editComment !== comment.documentId ? (
                  <>
                    <div className='flex items-center gap-2'>
                      <p className='text-sm font-semibold'>{comment?.user?.username}</p>
                      <p className='text-xs text-gray-400'>
                        {dayjs(comment.createdAt).fromNow()}
                      </p>
                    </div> 
                    <p className='text-sm'>{comment?.content}</p>
                  </>
                ) : (
                  <form onSubmit={(e) => void editCommentForm.handleSubmit((data) => handleEditComment(data, article.id))(e)}>
                    <textarea
                      className='w-full p-2 border rounded-lg'
                      {
                        ...editCommentForm.register('content', { required: true })
                      }
                    />
                    <div className='flex justify-end gap-2'>
                      <Button
                        type='submit'
                        title='Edit'
                        className='w-24'
                        loading={loadingUpdate}
                      />
                      <Button
                        type='button'
                        title='Cancel'
                        onClick={() => setEditComment('')}
                        className='w-20 bg-gray-500 text-white hover:bg-gray-600'
                      />
                    </div>
                  </form>
                )}
              
                {authData?.user?.id === comment?.user?.id && isAuthenticated && !editComment &&
                  <p className='text-xs text-gray-400 text-right'>
                    <span 
                      className='cursor-pointer text-blue-500 hover:underline'
                      onClick={() => {
                        setEditComment(comment.documentId)
                        editCommentForm.setValue('content', comment.content)
                      }}
                    >
                      edit
                    </span> 
                    {' '}|{' '}
                    <span 
                      className='cursor-pointer text-red-500 hover:underline'
                      onClick={() => void handleDeleteComment(comment.documentId, article.id)}
                    >
                      delete
                    </span>
                  </p>
                }
              </div>
            ))}
          </div>
        )
      }
      <ModalArticle
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleEdit}
        initialData={article}
      />
    </div>
  );
}

export default ArticleCard;