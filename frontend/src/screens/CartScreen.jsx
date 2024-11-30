import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { removeFromCart } from "../slices/cartSlice";
import Section from "../utils/Section";


const CartScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);

    const checkoutHandler = async () => {
        navigate('/login?redirect=/checkout'); 
    }

    const removeFromCartHandler = (x) => {
        dispatch(removeFromCart(x));
    }

  return (
    <div className="mx-auto">
        <h2 className="text-center text-3xl">
            CART <br />
            <Link to={'/'} className="text-lg underline text-neutral-500"> Continue shopping </Link>
        </h2>
        
        <Section>
            {cart.cartItems.length === 0 ? (<h1 className="text-center text-2xl tracking-widest">Your cart is empty </h1>) : (
                    <div className='grid lg:grid-cols-2 grid-cols-1 gap-4'>
                    <div className="md:w-[70%] mx-auto overflow-y-scroll h-screen no-scrollbar">
                        <ul>
                            {cart.cartItems.map((x, i) => 
                            <li key={i} className="flex items-center gap-4 mb-4 border-b pb-4">
                                <img width="90" height="160" src={x.image[0]} className='rounded' />
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold"> {x.name}</span>
                                    <span> Price: ${x.price}</span>
                                    <span> Quantity: {x.qty}</span>
                                    <span className="font-semibold">Total: ${(x.qty * x.price).toFixed(2)}</span>
                                    <button onClick={() => removeFromCartHandler(x)} className="btn w-[180px]">Remove from cart</button>
                                    
                                </div>
                            </li>)}
                        </ul>
                    </div>

                    <div className="sm:w-9/12 w-full mx-auto">

                        <div className="uppercase flex flex-col tracking-widest gap-4 mb-4">
                            <span className="">Subtotal : ${cart.itemsPrice}</span>
                            <span className="border-b pb-2">Shipping Price: ${cart.shippingPrice} </span>
                            <span className="font-bold">Total Price : ${cart.totalPrice}</span>
                        </div>

                        <div className="bg-neutral-100 py-12 px-4">
                            <button onClick={checkoutHandler} className="btn-main w-full block text-center">CHECK OUT</button>
                        </div>
                    </div>
                </div>
            )}

        </Section>

    </div>
  )
}

export default CartScreen