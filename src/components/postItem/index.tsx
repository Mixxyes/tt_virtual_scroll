import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { PostType } from '../../types';
import { useDispatch } from 'react-redux';
import { setFetchParam } from '../../redux/reducer';

interface PostItemProps {
  post: PostType;
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const dispatch = useDispatch();
  const { id, title, body } = post;

  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/post/${id}`);
        dispatch(setFetchParam(id));
      }}
      className={'post_wrapper'}>
      <div className={'post_id'}>#{id}</div>
      <div className={'post_title'}>
        {title.length > 50 ? title.substring(0, 50) + '...' : title}
      </div>
      <div className="post_body">
        {body.length > 160 ? (
          <>
            {`${body.substring(0, 160)} ...`}
            <button onClick={() => navigate('/')} className="more_btn">
              More...
            </button>
          </>
        ) : (
          body
        )}
      </div>
    </div>
  );
};
