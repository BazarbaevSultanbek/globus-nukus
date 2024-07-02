import React from 'react'
import { useSelector } from 'react-redux'

function Home_order() {
    const DarkTheme = useSelector(state => state?.shop.isDarkMode)
    return (
        <div className={DarkTheme ? 'Order-dark' : 'Order'}>
            <div className="Order-block">
                <div className="Order-block-delivery">
                    <div className='icon'>
                        <i className="fa-solid fa-truck"></i>
                    </div>
                    <p>Free Shipping</p>
                    <span>Our shippping policy applies to all orders,<br /> regardless of order value of destination.</span>
                </div>
                <div className="Order-block-payment">
                    <div className='icon'>
                        <i className="fa-solid fa-credit-card"></i>
                    </div>
                    <p>Secure Payments</p>
                    <span>
                        Your payments is always safe, secure, and protected at all times.
                    </span>
                </div>
                <div className="Order-block-support">
                    <div className='icon'>
                        <i className="fa-solid fa-headset"></i>
                    </div>
                    <p>Support Online 24/7</p>
                    <span>We are avialable  24/7 to assist you with any questions, or issues you may have.</span>
                </div>
            </div>
        </div >
    )
}

export default Home_order
