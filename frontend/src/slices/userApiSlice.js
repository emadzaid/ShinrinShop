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
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),

        registerUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            })
        }),

        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            })
        }),

        getAllUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}`,
                method: 'GET',
            })
        })

    })
});

export const { useLoginUserMutation, useLogoutUserMutation, useRegisterUserMutation, useProfileMutation, useGetAllUsersQuery} = userApiSlice;
export default userApiSlice;