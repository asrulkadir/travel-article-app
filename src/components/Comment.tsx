import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';

interface CommentProps {
  comments: string[];
  onAddComment: (comment: string) => void;
}

const Comment: React.FC<CommentProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="mt-4">
      <h3 className="font-semibold text-lg">Comments</h3>
      <div className="mt-2">
        {comments.map((comment, index) => (
          <p key={index} className="text-sm text-gray-600 mt-1">{comment}</p>
        ))}
      </div>
      <div className="flex mt-2">
        <Input
          id='comment'
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(val) => setNewComment(val)}
          className="flex-grow"
        />
        <Button
          type="button"
          title="Post"
          onClick={handleAddComment}
          className="ml-2"
        />
      </div>
    </div>
  );
};

export default Comment;