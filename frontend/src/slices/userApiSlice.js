import  apiSlice from "./apiSlice";
import { USERS_URL } from "../Constants";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            })
        })
    })
});

export const { useLoginUserMutation } = userApiSlice;
export default userApiSlice;