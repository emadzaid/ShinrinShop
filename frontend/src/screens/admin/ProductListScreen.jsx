import { useGetAllProductsQuery } from '../../slices/productApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {FaEdit, FaRegTrashAlt} from 'react-icons/fa';


const ProductListScreen = () => {
    const {data:products, isLoading, error} = useGetAllProductsQuery();
  return (
    isLoading ? (<Loader />) : error ? (<Message error={`${error?.data?.message || error.error || 'An error occured'}`} />) : (

        <div className='overflow-auto'>
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product, i) => 
                        <tr key={i}> 
                            <td><img className='w-16' src={product.image[0]} /></td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.type}</td>
                            <td>${product.price}</td>
                            <td><FaEdit /></td>
                            <td><FaRegTrashAlt /></td>
                        </tr>
                    )}
                </tbody>

            </table>
        </div>
    )
  )
}

export default ProductListScreen