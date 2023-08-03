import apiSlice from "../api/apiSlice";

const JobApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    post: build.mutation({
      query: (data) => ({
        url: "/job",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),
    getJobs: build.query({
      query: () => ({
        url: "/jobs",
      }),
      providesTags: ["Jobs"],
    }),
    JobById: build.query({
      query: (id) => ({
        url: `/job/${id}`,
      }),
    }),
  }),
});

export const { usePostMutation, useGetJobsQuery, useJobByIdQuery } = JobApi;
