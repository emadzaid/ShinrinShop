import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductByIdOnlyQuery, useUpdateProductMutation, useUploadFileMutation } from '../../slices/productApiSlice';

import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Container from '../../utils/Container';
import Title from '../../components/Title';
import { toast } from 'react-toastify';

const ProductEditScreen = () => {
    // Initialize state with proper defaults
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);
    const [material, setMaterial] = useState('');
    const [bestSelling, setBestSelling] = useState(false);
    const [size, setSize] = useState([]);
    const [image, setImage] = useState([]);

    const { id: productId } = useParams();
    const { data: product, isLoading, refetch, error } = useGetProductByIdOnlyQuery(productId);
    const [updateProduct, {isLoading:loadingUpdateProduct}] = useUpdateProductMutation();
    const [uploadProductImage, {isLoading:imageLoading}] = useUploadFileMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setName(product.name || '');
            setDescription(product.description || '');  
            setCategory(product.category || '');  
            setType(product.type || '');  
            setPrice(product.price || 0);  
            setCountInStock(product.countInStock || 0);  
            setMaterial(product.material || '');  
            setBestSelling(product.bestSelling || false); 
            setSize(product.size || []);  
            setImage(product.image || []);
        }
    }, [product]); 

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await updateProduct({productId, name, description, category, type, price, countInStock, material, bestSelling, size, image});
            refetch();
            toast.success('Product updated');
            navigate('/admin/panel');
            
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }
    }

    async function uploadFileHandler(e) {
        e.preventDefault();
        const formData = new FormData();
    
        // Append each file individually to FormData
        Array.from(e.target.files).forEach(file => {
            formData.append('photos', file); 
        });
    
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(() => [ 
                ...res.files.map((file) => file.image) // Append only new file URLs
            ]);
         
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
    
    return (
        isLoading ? (<Loader />) : error ? (<Message error={`${error?.data?.message || error.error || "An error occurred"}`} />) : (
            <Container>
                <div className="lg:w-[50%] md:w-[70%] w-[95%] mx-auto">
                    <form onSubmit={submitHandler} className="p-6 flex flex-col gap-8" encType="multipart/form-data">
                        <Title text1={'UPDATE'} text2={'PRODUCT'} className={'text-2xl my-2'} />
                        
                        <div>
                            <label>Product Name</label>
                            <input
                                type="text"
                                placeholder="Enter product name"
                                className="input input-bordered w-full mt-2"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Product Description</label>
                            <textarea
                            rows={6}
                                placeholder="Enter product description"
                                className="textarea textarea-bordered textarea-lg w-full mt-2"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div>
                            <label className='block'>Product Category</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}  className="select select-bordered w-full mt-2">
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                            </select>
                        </div>

                        <div>
                            <label>Product Type</label>
                            <input
                                type="text"
                                placeholder="Enter product type"
                                className="input input-bordered w-full mt-2"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Product Price</label>
                            <input
                                type="number"
                                placeholder="Enter product price"
                                className="input input-bordered w-full mt-2"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                min={0}
                            />
                        </div>

                        <div>
                            <label>Product Stock</label>
                            <input
                                type="number"
                                placeholder="Enter product stock"
                                className="input input-bordered w-full mt-2"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                                min={0}
                            />
                        </div>

                        <div>
                            <label>Product Material</label>
                            <input
                                type="text"
                                placeholder="Enter product material"
                                className="input input-bordered w-full mt-2"
                                value={material}
                                onChange={(e) => setMaterial(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Product Sizes</label>
                            <ul className="flex items-center gap-4 text-center mt-2">
                                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((item) => (
                                    <li
                                        key={item}
                                        className={`w-10 bg-gray-200 rounded cursor-pointer ${
                                            size.includes(item) ? 'bg-gray-700 text-white' : ''
                                        }`}
                                        onClick={() => {
                                            // Add the size to the array if it's not already included
                                            setSize((prevSize) =>
                                                prevSize.includes(item)
                                                    ? prevSize.filter((s) => s !== item) // Toggle: Remove if already in the array
                                                    : [...prevSize, item] // Add if not in the array
                                            );
                                        }}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <label className="cursor-pointer flex items-center gap-2">
                                <span>Best Selling</span>
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-sm"
                                    checked={bestSelling}
                                    onChange={(e) => setBestSelling(Boolean(e.target.checked))}
                                />
                            </label>
                        </div>

                        <div>
                            <label className="mr-2">Product Images (Maximum 7 allowed) </label>
                            <input
                                type="text"
                                placeholder="Image URL"
                                className="input input-bordered w-full my-2"
                                value={image.join(', ')}
                                onChange={(e) => setImage}
                                disabled
                            />
                            <input type="file" onChange={uploadFileHandler} multiple name='photos' className="file-input file-input-bordered w-full max-w-xs" />
                        </div>

                        <button type="submit" className="btn-main uppercase">
                            {loadingUpdateProduct ? <Loader /> : 'Update'}
                        </button>
                    </form>
                </div>
            </Container>
        )
    );
}

export default ProductEditScreen;
