import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchPostByIdQuery } from '../../redux/api';

export const PostPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: post, isLoading } = useFetchPostByIdQuery(Number(id));

  return (
    <>
      {isLoading ? <div>Загрузка данных</div> : null}
      {!isLoading ? (
        <>
          <div>POST #{post?.id}</div>
          <h2>{post?.title}</h2>
          <div>{post?.body}</div>
          <button onClick={() => navigate('/')} className="back_btn">
            To main page
          </button>
        </>
      ) : null}
    </>
  );
};
