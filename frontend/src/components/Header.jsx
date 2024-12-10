import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useLogoutUserMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";

import SearchBox from "./SearchBox";

const Header = () => {

  const [searchField, setSearchField] = useState(false);

  const {cartItems} = useSelector((state) => state.cart);
  const {totalPrice, shippingPrice, itemsPrice} = useSelector((state) => state.cart);
  const {userInfo} = useSelector((state) => state.auth);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const [logoutUserApiCall, {isLoading}] = useLogoutUserMutation();

  const location = useLocation();

  useEffect(() => {
    const drawerCheckbox = document.getElementById('my-drawer-4');
    if (drawerCheckbox) {
      drawerCheckbox.checked = false; // Close the drawer on route change
    }
  }, [location]);

  const checkoutHandler = async () => {
    navigate('/login?redirect=/checkout'); 
  }

  const logoutHandler = async () => {
    try {
      await logoutUserApiCall().unwrap();
      dispatch(logout());
      // reset cart here
      navigate('/login')

    } catch (error) {
      console.log(error);
    }
 
  }

  const toggleSearchField = () => {
    searchField ? setSearchField(false) : setSearchField(true);
  }

return (
    <div className="relative">

        {/* SERACH FIELD START  */}
          <SearchBox searchField={searchField} setSearchField={setSearchField} />
        {/* SERACH FIELD END  */}

      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className={`transition  ${searchField ? 'opacity-0' : 'opacity-1'}`}>
        {/* Navbar */}
        <div className="navbar justify-between border-b w-full h-24">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
            <Link to={'/'}><span className="logo-text text-lg">ShinrinShop</span></Link>
          </div>
          
          <Link to={'/'}> <span className="logo-text hidden mx-2 lg:block">ShinrinShop</span> </Link>

          <div className='gap-8 uppercase'>
            
            <div className="navDropDown dropdown-hover ">
              <div tabIndex={0} role="button" className="font-bold text-sm m-1 "><Link to={'/collections/women'}>Women</Link></div>
              <ul tabIndex={0} className="navDropDownContent dropdown-content bg-base-200 tracking-widest">
                <li><Link to={'/collections/women/kimono-jacket'}>Kimono Jacket</Link></li>
                <li><Link to={'/collections/women/kimono'}>Japanese Kimono</Link></li>
                <li><Link to={'/collections/women/robe'}>Robes</Link></li>
                <li><Link to={'/collections/women/loungewear'}>Samue Loungewear</Link></li>     
              </ul>
        
            </div>

            <div className="navDropDown dropdown-hover">
              <div tabIndex={0} role="button" className="font-bold text-sm m-1"><Link to={'/collections/men'}>Men</Link></div>
              <ul tabIndex={0} className="navDropDownContent dropdown-content bg-base-200 tracking-widest">
                <li><Link to={'/collections/men/yukata'}>Yukata</Link></li>
                <li><Link to={'/collections/men/padded-jacket'}>Padded Jacket</Link></li>       
              </ul>
        
            </div>

            <div className="navDropDown dropdown-hover">
              <div tabIndex={0} role="button" className="font-bold text-sm m-1">Gifts & Accessories</div>
              <ul tabIndex={0} className="navDropDownContent dropdown-content bg-base-200 tracking-widest">
                <li><Link to={'/collections/women/accessories'}>For her</Link></li> 
                <li><Link to={'/collections/men/accessories'}>For him</Link></li>       
              </ul>
        
            </div>

          </div>
      
          <div className="flex-none lg:block">
            <ul className="menu-horizontal items-center gap-4 mr-2">
              {/* Navbar menu content here */}

              <li>
                <button className="block" onClick={toggleSearchField}>
                  <svg fill="#000000" className="sm:h-6 h-4" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 317.182 317.182" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M185.757,0C114.507,0,56.542,57.966,56.542,129.215c0,34.055,13.249,65.069,34.855,88.175L2.212,306.575l10.606,10.607 l89.44-89.44c22.537,19.129,51.691,30.688,83.498,30.688c71.249,0,129.214-57.966,129.214-129.215S257.006,0,185.757,0z M185.757,243.43c-62.979,0-114.215-51.236-114.215-114.215S122.778,15,185.757,15c62.978,0,114.214,51.236,114.214,114.215 S248.734,243.43,185.757,243.43z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>
                </button>
              </li>

              <li className='cursor-pointer'>
                {userInfo ? (

                  <div className="dropdown dropdown-hover  dropdown-end">
                    <div tabIndex={0} role="button" className="m-1 uppercase border-2 border-gray-500 rounded-full px-3 py-1">{userInfo.name[0]}</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow">
                      <li className="border-b uppercase tracking-widest"><Link to='/profile'> My Profile </Link></li>

                      {userInfo?.isAdmin ? (<li className="border-b uppercase tracking-widest"> <Link to='/admin/panel'>Admin Panel</Link></li>)  : 

                      (<li className="border-b uppercase tracking-widest"><Link to='/myorders'> My Orders </Link></li>

                      )}

                      
                      <li><button className="uppercase tracking-widest" onClick={logoutHandler}>Sign out</button></li>
                    </ul>
                  </div>
                ) : 
                
                (<>
                    <Link to={'/login'}>
                      <svg
                      fill="#000000"
                      className='sm:h-6 h-4'
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                      stroke="#000000"
                      strokeWidth="11.776">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <g> <g> <path d="M256,0c-65.733,0-119.211,53.479-119.211,119.211S190.267,238.423,256,238.423s119.211-53.479,119.211-119.211 S321.733,0,256,0z M256,218.024c-54.486,0-98.813-44.328-98.813-98.813S201.515,20.398,256,20.398s98.813,44.328,98.813,98.813 S310.485,218.024,256,218.024z"></path> </g> </g> 
                        <g> <g> <path d="M426.272,331.529c-45.48-45.48-105.952-70.529-170.272-70.529c-64.32,0-124.791,25.047-170.273,70.529 c-45.48,45.48-70.529,105.952-70.529,170.272c0,5.632,4.566,10.199,10.199,10.199h461.204c5.632,0,10.199-4.567,10.199-10.199 C496.801,437.482,471.752,377.01,426.272,331.529z M35.831,491.602C41.179,374.789,137.889,281.398,256,281.398 s214.821,93.391,220.17,210.204H35.831z"></path> </g> </g>
                        <g> <g> <path d="M182.644,457.944H66.295c-5.633,0-10.199,4.567-10.199,10.199s4.566,10.199,10.199,10.199h116.349 c5.633,0,10.199-4.567,10.199-10.199S188.277,457.944,182.644,457.944z"></path> </g> </g> <g> <g> <path d="M225.621,457.944h-7.337c-5.633,0-10.199,4.567-10.199,10.199s4.566,10.199,10.199,10.199h7.337 c5.633,0,10.199-4.567,10.199-10.199S231.254,457.944,225.621,457.944z"></path></g> </g>
                      </g>
                      </svg>
                    </Link>   
                </>)}

      
              
              </li>

              <li>
    
                {/* CART DRAWER */}

                <div className="drawer drawer-end z-[1]">
                  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                  <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
                      <svg
                      className="sm:h-8 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M20.232 10.5257C19.6468 7.40452 19.3542 5.84393 18.2433 4.92196C17.1324 4 15.5446 4 12.369 4H11.6479C8.47228 4 6.8845 4 5.7736 4.92196C4.66271 5.84393 4.37009 7.40452 3.78487 10.5257C2.96195 14.9146 2.55049 17.1091 3.75011 18.5545C4.94973 20 7.18244 20 11.6478 20H12.369C16.8344 20 19.0672 20 20.2668 18.5545C20.9628 17.7159 21.1165 16.6252 20.9621 15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path> 
                        <path d="M9.1709 8C9.58273 9.16519 10.694 10 12.0002 10C13.3064 10 14.4177 9.16519 14.8295 8" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path>
                      </g>
                      </svg>                 
                    </label>
                    
                  </div>

                  <div className="drawer-side">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="p-4 bg-base-200 text-base-content min-h-full sm:w-96 w-[90%]">
                      <li className="border-b border-gray-300 mb-4"> <h3 className="text-2xl py-1">YOUR CART</h3> </li>
                      {cartItems.length > 0 ? (
                        <>
                          {cartItems.map((item, index) => <li key={index}><Cart item={item} /></li>)}
                          <div className="uppercase flex flex-col items-end text-justify tracking-wider py-4 px-2 gap-2">
                            <span>Subtotal Price ${`${itemsPrice}`}</span>
                            <span className="border-b-2 border-gray-500 pb-2">Shipping Price ${`${shippingPrice}`}</span>
                            <span className="font-bold">Total Price ${`${totalPrice}`}</span>
                         </div>
                       
                        <li className="px-2">
                          <Link to={'/cart'} className="bg-neutral-300 hover:bg-neutral-400 py-2 px-4 w-full block text-center mb-2 transition">VIEW CART</Link>
                       </li>

                       <li className="px-2">
                          <button onClick={checkoutHandler} className="btn-main w-full block text-center">CHECK OUT</button>
                       </li>
                        
                        </>
                      ) : (<p>Your cart is empty</p>)}

                    </ul>
                  </div>
                </div>
              </li>

            </ul> 

          </div>
        </div>
     
      </div>
      <div className="drawer-side z-[1]">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        
        {/* Sidebar content here */}
        <ul className="menu bg-base-200 min-h-full sm:w-[50%] w-[90%] p-4">

          <h3 className="border-y text-lg uppercase font-light p-2 mb-2 bg-gray-200 rounded">Women</h3>
          <li><Link to={'/collections/women'}>Women Collection</Link></li> 
          <li><Link to={'/collections/women/kimono-jacket'}>Kimono Jacket</Link></li> 
          <li><Link to={'/collections/women/kimono'}>Japanese Kimono</Link></li>
          <li><Link to={'/collections/women/robe'}>Robes</Link></li>
          <li><Link to={'/collections/women/loungewear'}>Samue Loungewear</Link></li>

          <h3 className="border-y text-lg uppercase font-light p-2 my-2 bg-gray-200 rounded">Men</h3>
          <li><Link to={'/collections/men'}>Men Collection</Link></li> 
          <li><Link to={'/collections/men/yukata'}>Yukata</Link></li>
          <li><Link to={'/collections/men/padded-jacket'}>Padded Jacket</Link></li> 

          <h3 className="border-y text-lg uppercase font-light p-2 my-2 bg-gray-200 rounded">Gifts & Accessories</h3>
          <li><Link to={'/collections/women/accessories'}>For her</Link></li> 
          <li><Link to={'/collections/men/accessories'}>For him</Link></li>   

        </ul>

        

      </div>
    </div>
  )
}

export default Header;