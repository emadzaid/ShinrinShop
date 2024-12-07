import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"

import { useGetOrderByIdQuery, usePayOrderMutation, useGetPayPalClientIdQuery } from '../slices/orderApiSlice';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";


const PaymentScreen = () => {

    const {id:orderId} = useParams();
    const navigate = useNavigate();
    const {data:order, isLoading:loadingOrder,  refetch, error:errorOrder} = useGetOrderByIdQuery(orderId)
    const [payOrder, {isLoading:loadingPay}] = usePayOrderMutation();
    const [{isPending}, paypalDispatch] = usePayPalScriptReducer();
    const {data:paypal, isLoading:loadingPayPal, error: errorPayPal } = useGetPayPalClientIdQuery()
    
    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && paypal.clientId) {
          const loadPaypalScript = async () => {
            paypalDispatch({
              type: 'resetOptions',
              value: {
                'client-id': paypal.clientId,
                currency: 'USD',
              },
            });
            paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
          };
          if (order && !order.isPaid) {
            if (!window.paypal) {
              loadPaypalScript();
            }
          }
        }
      }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

    // TESTING ONLY! REMOVE BEFORE PRODUCTION
    async function onApproveTest() {
      await payOrder({ orderId, details: { payer: {} } });
      refetch();
      navigate(`/orders/${order._id}`);
      toast.success('Order is paid');
    }

      function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
          try {
            await payOrder({ orderId, details });
            refetch();
            navigate(`/orders/${order._id}`);
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        });
      }

      function onError(err) {
        toast.error('Failed to Pay');
      }

      function createOrder(data, actions) {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: { value: order.totalPrice },
              },
            ],
          })
          .then((orderID) => {
            return orderID;
          });
      }    

  return (
    <div>
            {loadingOrder ? (<Loader />) : errorOrder ? (<Message error={`${errorOrder?.data?.message || errorOrder.error}`} />) : (<>
     
                {!order.isPaid && order.paymentMethod === 'PayPal' ? (
                <>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <>
                    <h2 className="text-center text-lg tracking-wide my-8 text-gray-400">Review your order and ensure details are correct before payment. </h2>
                    <div className=" flex flex-col items-center justify-around py-4 h-[400px]">

                      {/* // THIS BUTTON IS FOR TESTING! REMOVE BEFORE PRODUCTION!  */}
                      <button
                        onClick={onApproveTest}
                        style={{ marginBottom: '10px' }}
                      >
                        Test Pay Order
                      </button> 

                      <div className="sm:w-[400px] w-[300px] max-[370px]:w-[250px] mx-auto h-96 overflow-y-scroll no-scrollbar">
                        <div className="" >
                            <PayPalButtons
                                style={{
                                  layout: 'vertical',
                                  color: 'silver',
                                  shape: 'pill',
                                  label: 'pay',
                                }}
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                              ></PayPalButtons>
                            </div>      
                        </div>
                    </div>
                    </>
                  )}
                </>
              ) : (
                navigate(`/orders/${order._id}`)
              )} 
            
             </>)}

          
    </div>
  )
}

export default PaymentScreen