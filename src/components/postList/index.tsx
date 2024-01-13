import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PostItem } from '../postItem';

import { setFetchParam } from '../../redux/reducer';
import { useFetchFewPostsQuery } from '../../redux/api';

import type { PostType } from '../../types';
import type { RootState } from '../../redux/store';

import debounce from 'debounce';

export const PostList: React.FC = () => {
  const dispatch = useDispatch();
  const { start } = useSelector((state: RootState) => state.fetchParam);

  const [startPostParam, setStartPostParam] = useState(0);
  const [isScreenEnd, setIsScreenEnd] = useState(false);
  const [isScreenStart, setIsScreenStart] = useState(false);

  const { data: postList, isLoading } = useFetchFewPostsQuery({ limit: 10, start: startPostParam });

  const updateIsScreenStart = debounce(() => {
    setIsScreenStart(true);
  }, 150);

  const updateIsScreenEnd = debounce(() => {
    setIsScreenEnd(true);
  }, 150);

  const scrollHandler = (e: any) => {
    if (e.target.documentElement.scrollTop < 180) {
      updateIsScreenStart();
    }

    if (
      e.target.documentElement.scrollHeight -
        e.target.documentElement.scrollTop -
        document.documentElement.clientHeight <
      180
    ) {
      updateIsScreenEnd();
    }
  };

  useEffect(() => {
    if (isScreenEnd) {
      setStartPostParam((value) => {
        return value < 90 ? value + 2 : value;
      });

      setIsScreenEnd(false);
    }
  }, [isScreenEnd]);

  useEffect(() => {
    if (isScreenStart) {
      setStartPostParam((value) => {
        if (value >= 2) {
          if (document.documentElement.scrollTop === 0) window.scrollBy(0, 1);
          return value - 2;
        } else if (value === 1) {
          return value - 1;
        } else return value;
      });

      setIsScreenStart(false);
    }
  }, [isScreenStart]);

  useEffect(() => {
    if (start > 0) {
      setTimeout(() => window.scrollTo(0, 1), 400);
      setStartPostParam(start - 1);
      dispatch(setFetchParam(0));
    }
    document.addEventListener('scroll', scrollHandler);

    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <div className="post_list">
      {postList?.map((post: PostType) => (
        <PostItem key={post.id} post={post} />
      ))}
      {isLoading ? <div>Загрузка данных</div> : null}
    </div>
  );
};
