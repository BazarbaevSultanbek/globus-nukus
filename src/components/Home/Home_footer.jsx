import React from 'react'

function Home_footer() {
    return (
        <div className='Footer'>
            <div className="Footer-block">
                <div className="Footer-block-info">
                    <div className="Footer-block-info-header">
                        <h2>Get to Know Us</h2>
                    </div>
                    <ul>
                        <li>News & Blog</li>
                        <li>Careers</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className="Footer-block-returns">
                    <div className="Footer-block-returns-header">
                        <h2>Orders & Returns</h2>
                    </div>
                    <ul>
                        <li>Shipping & Delivery</li>
                        <li>Return & Exchange</li>
                        <li>Track Order</li>
                        <li>Payment</li>
                    </ul>
                </div>

                <div className="Footer-block-contact">
                    <div className="Footer-block-contact-header">
                        <h2>Contact</h2>
                    </div>
                    <ul>
                        <li>
                            <i className="fa-solid fa-phone-volume"></i>
                            <span>(702) 555-0122</span>
                        </li>
                        <li>
                            <i className="fa-solid fa-envelope"></i>
                            <span>bazarbaeoff@gmail.com</span>
                        </li>
                        <li>
                            <i className="fa-solid fa-location-dot"></i>
                            <span>Nukus, Uzbekistan</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home_footer
