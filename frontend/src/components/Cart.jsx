import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../slices/cartSlice";

const Cart = ({item}) => {
     
    const dispatch = useDispatch();

    const removeFromCartHandler = () => {
        dispatch(removeFromCart(item));
    }

  return (
    
    <>
        <div className="flex flex-col px-2 py-4 gap-3 items-center border-b">
            <Link className="flex items-start gap-4" to={`/collections/${item.category}/${item.type}/${item._id}`}>
            <img className='max-h-32 max-w-24 rounded' src={item.image[0]} /> 
            <div className="font-light flex flex-col gap-2">
                <span className="text-2xl">{item.name}</span>
                <span className="text-sm font-bold">Type: {item.type}</span>
                <span className="text-sm font-bold">Size: {item.selectedSize}</span>
                <span className="text-sm font-bold">Price: ${item.price}</span>       
                <span className="text-sm font-bold">Quantity: {item.qty}</span>             
            
            </div> 
            </Link>
            <button className="underline" onClick={(removeFromCartHandler)}> Remove from cart </button>
        </div>
    </>

  )
}

export default Cart;