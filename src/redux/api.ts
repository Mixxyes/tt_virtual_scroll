import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PostType } from '../types';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    fetchFewPosts: builder.query<PostType[], { limit: number; start: number }>({
      query: ({ limit = 10, start = 0 }) => ({
        url: '/posts',
        params: {
          _limit: limit,
          _start: start,
        },
      }),
    }),
    fetchPostById: builder.query<PostType, number>({
      query: (id: number = 0) => ({
        url: `/posts/${id}`,
      }),
    }),
  }),
});

export const { useFetchFewPostsQuery, useFetchPostByIdQuery } = postApi;
