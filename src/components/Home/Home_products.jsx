import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from '@mantine/carousel';
import { Button } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import React, { useRef } from 'react';
import { addCountProduct, addProToCart } from '../../store/Reducers/Reducer';
import { showNotification } from '@mantine/notifications';

function Home_products() {
    const products = useSelector(state => state?.shop.products);
    const currentUser = useSelector(state => state?.shop.currentUser)
    const DarkTheme = useSelector(state => state?.shop.isDarkMode)
    const autoplay = useRef(Autoplay({ delay: 2000 }));
    const autoplayImages = useRef(Autoplay({ delay: 10000 }));
    const cart = useSelector(state => state?.shop.cart)
    const dispatch = useDispatch()
    return (
        <div className={DarkTheme ? 'Products-dark' : 'Products'}>
            <div div className="container" >
                <div className="Products-header">
                    <h2>Featured Products</h2>
                </div>
                <div className="Products-block">
                    <Carousel
                        height={200}
                        slideSize={{ base: '100%', sm: '50%', md: '33.333333%' }}
                        slideGap={{ base: 0, sm: 'XL' }}
                        loop
                        align="start"
                        plugins={[autoplay.current]}
                        onMouseEnter={autoplay.current.stop}
                        onMouseLeave={autoplay.current.reset}
                        id='productMain'
                    >
                        {products.map((item) => (
                            <Carousel.Slide key={item.id} id="productCard">
                                <div className='Products-block-item'>
                                    <div className="Products-block-item-images">
                                        <Carousel
                                            loop={true}
                                            height={200}
                                            plugins={[autoplayImages.current]}
                                            onMouseEnter={autoplayImages.current.stop}
                                            onMouseLeave={autoplayImages.current.reset}
                                        >
                                            {item.images.map((img) => (
                                                <Carousel.Slide key={img.id}>
                                                    <img src={img.image} alt={item.name} />
                                                </Carousel.Slide>
                                            ))}
                                        </Carousel>
                                    </div>
                                    <div className='Products-block-item-info'>
                                        <p className='item-info-name'>{item.name}</p>
                                        <span className='item-info-description'>
                                            {item.description}
                                        </span>
                                        <div className="Products-item-info-navi">
                                            {cart?.some(cartItem => cartItem.product.id === item.id) ? (
                                                cart?.map(product => {
                                                    if (product.product.id === item.id) {
                                                        return (
                                                            <div key={product.product.id} className='Products-item-count'>
                                                                <Button onClick={() => dispatch(addCountProduct({ id: product.product.id, status: 'minus' }))}>-</Button>
                                                                <span>{product.count}</span>
                                                                <Button onClick={() => dispatch(addCountProduct({ id: product.product.id, status: 'plus' }))}>+</Button>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            ) : (
                                                <Button color='red' onClick={() => currentUser ? dispatch(addProToCart({
                                                    product: item,
                                                    count: 1,
                                                })) : showNotification({
                                                    title: 'Add Product Failed',
                                                    message: 'Unathourized!',
                                                    color: 'red',
                                                })}><ShoppingCartOutlined /></Button>
                                            )}





                                            {/* <button id='likeItem' onClick={() => dispatch(addLikeProduct(item))}>
                                                {
                                                    LikedProducts?.map((likedPro) => {
                                                        if (likedPro.id === item.id) {
                                                            return (<i className="fa-solid fa-heart" style={{ color: 'red' }}></i>)
                                                        } else if (likedPro.id === item.id || !likedPro) {
                                                            return (<i className="fa-regular fa-heart"></i>)
                                                        }
                                                    })
                                                }
                                            </button> */}


                                            <div className='Products-info-navi-prices'>
                                                <span style={{ display: item.discounts ? 'block' : 'none' }}>{item.price}</span>
                                                <span>{item.discounts ? item.discount_price : item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                </div>
            </div >
        </ div >
    );
}

export default Home_products;
1