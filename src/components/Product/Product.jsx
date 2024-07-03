import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ShoppingCartOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Spoiler } from '@mantine/core';
import { addCountProduct, addProToCart, setUpDarkTheme } from '../../store/Reducers/Reducer';
import { showNotification } from '@mantine/notifications';
import axios from 'axios';

import '../style/Product.scss';

function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const cart = useSelector((state) => state.shop.cart);
    const currentUser = useSelector((state) => state.shop.currentUser);
    const DarkTheme = useSelector((state) => state.shop.isDarkMode);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const item = await axios.get(`https://globus-nukus.uz/api/products/${id}`);
                setProduct(item.data.data);
            } catch (error) {
                alert('Product not found');
            }
        };

        fetchRequest();
    }, [id]);

    const handleChangeTheme = () => {
        dispatch(setUpDarkTheme());
    };


    console.log(product);
    return (
        <div className={DarkTheme ? 'Product-dark' : 'Product'}>
            <div className="container">
                <div className="Product-header">
                    <div className="Product-header-block">

                        <div className="Product-header-menu">
                            <input type="checkbox" id="productMenu" />
                            <label htmlFor="productMenu"><i className="fa-solid fa-bars"></i></label>
                            <ul>
                                <label htmlFor="productMenu"><i className="fa-solid fa-x"></i></label>
                                <div>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link>Liked Products</Link></li>
                                    <li><Link to="/MyCart">My Cart <ShoppingCartOutlined /></Link></li>
                                </div>
                            </ul>
                        </div>
                        <div className="Product-header-back">
                            <Link to="/">
                                <i className="fa-solid fa-arrow-left"></i>
                                Back
                            </Link>
                        </div>
                        <div className="Product-header-logo"><p>G-Nukus</p></div>
                        <div className="Product-header-search">
                            <Input.Search placeholder="input search text" enterButton />
                        </div>
                        <div className="Product-header-navi">
                            {currentUser ? (
                                <Link to="/myProfile">
                                    <Button size="xs" color="rgba(33, 107, 255, 1)">
                                        <i className="fa-solid fa-user"></i>
                                    </Button>
                                </Link>
                            ) : (
                                <Link to="/Login">
                                    <Button size="xs" color="rgba(33, 107, 255, 1)">
                                        Login
                                    </Button>
                                </Link>
                            )}
                            <Button
                                variant="filled"
                                color="rgba(33, 107, 255, 1)"
                                size="xs"
                                onClick={handleChangeTheme}
                                style={{ height: '40px' }}
                            >
                                {DarkTheme ? <SunOutlined /> : <MoonOutlined />}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="Product-block">                    
                    <div className="Product-block-main">
                        <div className="Product-block-main-photos">
                            {product?.items?.images?.map((img) => (
                                <img key={img.id} src={img.image} alt="photo" />
                            ))}
                        </div>
                        <div className="Product-block-main-info">
                            <div className="Product-main-info-name">
                                <h3>{product?.items?.name}</h3>
                            </div>
                            <div className="Product-main-info-desc">
                                <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
                                    {product?.items?.description}
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi iure ea dolor placeat, laudantium quam laborum nisi qui, aut recusandae minus dicta quo dolore quis autem officia ab optio alias?
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non mollitia rerum similique earum, perferendis aliquid. Aliquid animi omnis ab, adipisci provident qui quas rem voluptas voluptatum ut magni autem facilis.
                                </Spoiler>
                                <p></p>

                            </div>
                            <div className="Product-main-info-navi">
                                <div className="Products-info-navi-prices">
                                    <span style={{ display: product?.items?.discounts ? 'block' : 'none' }}>{product?.items?.price}</span>
                                    <span>{product?.items?.discounts ? product?.items?.discount_price : product?.items?.price}</span>
                                </div>
                                {cart?.some((cartItem) => cartItem.product.id === product.items.id) ? (
                                    cart.map((item) => {
                                        if (item.product.id === product.items.id) {
                                            return (
                                                <div key={item.product.id} className="Products-item-count">
                                                    <Button onClick={() => dispatch(addCountProduct({ id: item.product.id, status: 'minus' }))}>-</Button>
                                                    <span>{item.count}</span>
                                                    <Button onClick={() => dispatch(addCountProduct({ id: item.product.id, status: 'plus' }))}>+</Button>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })
                                ) : (
                                    <Button
                                        color="red"
                                        onClick={() =>
                                            currentUser
                                                ? dispatch(addProToCart({ product, count: 1 }))
                                                : showNotification({
                                                    title: 'Add Product Failed',
                                                    message: 'Unauthorized!',
                                                    color: 'red',
                                                })
                                        }
                                    >
                                        <ShoppingCartOutlined />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Product;
