import {Link} from 'react-router-dom';
import { useGetAllProductsQuery, useAddNewProductMutation, useDeleteProductMutation } from '../../slices/productApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {FaEdit, FaRegTrashAlt, FaPlus} from 'react-icons/fa';
import {toast} from 'react-toastify'
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const ProductListScreen = () => {
    const {data:products, isLoading, refetch, error} = useGetAllProductsQuery({keyword: {}});
    const [addNewProduct, {isLoading: addingProductLoader}] = useAddNewProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const createProductHandler = async () => {
        try {
            await addNewProduct();
            refetch();
            toast.success('New Product Added');

        } catch (err) {
            toast.err(err?.data?.message || err.error);
        }
  
    }

    const deleteProductHandler = async (id) => {
        if (window.confirm('Are you sure')) {
          try {
            await deleteProduct(id);
            refetch();
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        }
      };

  return (
    isLoading ? (<Loader />) : error ? (<Message error={`${error?.data?.message || error.error || 'An error occured'}`} />) : (

            <div className='overflow-auto'>
                <button onClick={createProductHandler} className='btn-main text-[10px] my-4 flex items-center gap-1'>{addingProductLoader ? (<Loader />) : ('Add New Product')}<FaPlus /> </button>
                <table className="table ">
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
                                <td><LazyLoadImage effect='blur' className='w-16' src={product.image[0]} /></td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.type}</td>
                                <td>${product.price}</td>
                                <td><Link to={`/admin/products/${product._id}/edit`}><FaEdit /></Link></td>
                                <td><button onClick={() => deleteProductHandler(product._id)}><FaRegTrashAlt /></button></td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>
    )
  )
}

export default ProductListScreen