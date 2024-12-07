import { useGetAllUsersQuery } from "../../slices/userApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {FaEdit, FaRegTrashAlt} from 'react-icons/fa';


const UserListScreen = () => {
  const {data:users, isLoading, error} = useGetAllUsersQuery();
  return (
    isLoading ? (<Loader />) : error ? (<Message error={`${error?.data?.message || error?.error || 'An error occured'}`} />) : (

      <div className="overflow-x-auto">

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>

          {users.map((user, i) => 
            <tr key={i}>
              <th>{user._id}</th>
              <th>{user.name}</th>
              <th>{user.email}</th>
              <th>{user.isAdmin ? 'Yes' : 'No'}</th>
              <th><FaEdit /></th>
              <th><FaRegTrashAlt /></th>
            </tr>
          )}
         
          </tbody>
        </table>
      </div>
    )
  )
}

export default UserListScreen