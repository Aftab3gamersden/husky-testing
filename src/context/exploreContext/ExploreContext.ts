
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {Experience} from '../../src/types/Explore.types'

type ExperienceData = {
  Experiences: Experience[];
}

// Create the API
export const GetExploreApi = createApi({
  reducerPath: 'exploreApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.tickitapp.xyz/api/v1/' }),
  endpoints: (builder) => ({
    getExperience: builder.query<ExperienceData, number>({
      query: (id) => `explore/${id}`, 
    }),
    addToBucketList: builder.mutation({
      query: (data) => ({
        url: 'bucketlist/add',
        method: 'POST',
        body: data,
      }),
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: 'epic/createcomment',
        method: 'POST',
        body: data,
      }),
    }),
    bulkUnfollow: builder.mutation({
      query: (data) => ({
        url: 'users/bulk-unfollow',
        method: 'DELETE',
        body: data,
      }),
    }),
    bulkFollow: builder.mutation({
      query: (data) => ({
        url: 'users/bulk-follow',
        method: 'POST',
        body: data,
      }),
    }),
    bulkLike: builder.mutation({
      query: (data) => ({
        url: 'experiences/bulk-like',
        method: 'POST',
        body: data,
      }),
    }),
    bulkunLike: builder.mutation({
      query: (data) => ({
        url: 'experiences/bulk-unlike',
        method: 'DELETE',
        body: data,
      }),
    }),
  }),
});

// Export the auto-generated hooks for fetching data and mutating the bucket list
export const {
  useGetExperienceQuery,
  useAddToBucketListMutation,
  useCreateCommentMutation,
  useBulkUnfollowMutation,
  useBulkFollowMutation,
  useBulkLikeMutation,
  useBulkunLikeMutation,
} = GetExploreApi;
