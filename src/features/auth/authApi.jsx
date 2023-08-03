import apiSlice from "../api/apiSlice";
import { getUser } from "./authSlice";

const authAPi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/user",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          console.log(res);
          dispatch(getUser(data.email));
        } catch (e) {}
      },
    }),
  }),
});

export const { useRegisterMutation } = authAPi;
