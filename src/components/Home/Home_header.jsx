import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input, Spin } from "antd";
import { Button } from "@mantine/core";
import { MoonOutlined, ShoppingCartOutlined, SunOutlined } from "@ant-design/icons";
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Home_products from "./Home_products";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import axios from "axios";
import { setUpDarkTheme, setUpState } from "../../store/Reducers/Reducer";
import '@mantine/carousel/styles.css';
import '../style/Home.scss'
import Home_order from "./Home_order";
import Home_support from "./Home_support";
import Home_footer from "./Home_footer";

function Header() {
    const currentUser = useSelector(state => state?.shop.currentUser)
    const cart = useSelector(state => state?.shop.cart)
    const DarkTheme = useSelector(state => state?.shop.isDarkMode)
    const dispatch = useDispatch()
    const { Search } = Input;
    const [loading, setLoading] = useState(false);
    const [discount_products, setDisProducts] = useState([])
    const autoplay = useRef(Autoplay({ delay: 2000 }));


    useEffect(() => {
        const fetchRequest = async () => {
            try {
                setLoading(true);
                const itemsResponse = await axios.get('https://globus-nukus.uz/api/products');
                const categoriesResponse = await axios.get('https://globus-nukus.uz/api/categories');
                dispatch(setUpState({
                    products: itemsResponse.data.data.items,
                    categories: categoriesResponse.data.data.categories,
                }));
                const discountedItems = itemsResponse.data.data.items.filter((item) =>
                    item.discount_price !== 0 && item.discount_price !== null && item.discounts !== null
                );
                setDisProducts(discountedItems);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };
        fetchRequest();
    }, [dispatch]);

    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const handleChangeTheme = () => {
        dispatch(setUpDarkTheme())
    }

    if (loading) {
        return (
            <div className="Loading">
                <Spin spinning={loading} delay={500} />
                <div style={{ marginTop: 16 }}></div>
            </div>
        );
    } else {
        return (
            <div className={DarkTheme ? "wrapper-dark" : "wrapper"}>
                <header className={DarkTheme ? "Header-dark" : "Header"}>
                    <div className="container">
                        <div className="Header-navi">
                            <div className="Header-navi-left">
                                <div className="Header-navi-left-menu">
                                    <input type="checkbox" id="checkbox" />
                                    <label htmlFor="checkbox"><i className="fa-solid fa-bars"></i></label>
                                    <nav className="Header-left-menu-list" style={{ top: currentUser ? '-15px' : '0 !important' }}>
                                        <label htmlFor="checkbox" id="closeLabel"><i className="fa-solid fa-x"></i></label>
                                        <p>Menu</p>
                                        <ul>
                                            <Link to={'/'}><li>Home</li></Link>
                                            <Link to={'/Categories'}><li id="categories">Categories</li></Link>
                                            <Link to={'/Cart'} style={{ display: currentUser ? 'block' : 'none' }}><li id="cart">
                                                Cart
                                                <ShoppingCartOutlined />
                                                <span id="cartCount" style={{ display: cart?.length === 0 ? 'none' : 'block' }}>{cart?.length}</span>
                                            </li></Link>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="Header-navi-left-logo"><p>G-Nukus</p></div>
                            </div>
                            <div className="Header-navi-controls">
                                <div className="Header-navi-controls-buttons">
                                    {currentUser !== null ?
                                        <Link to={'/myProfile'}>
                                            <Button size="xs" color="rgba(33, 107, 255, 1)">
                                                <i className="fa-solid fa-user"></i>
                                            </Button>
                                        </Link>
                                        :
                                        <Link to={'/Login'}>
                                            <Button size="xs" color="rgba(33, 107, 255, 1)" >
                                                Login
                                            </Button>
                                        </Link>
                                    }
                                    <Button
                                        variant="filled"
                                        color="rgba(33, 107, 255, 1)"
                                        size="xs"
                                        onClick={handleChangeTheme}
                                        style={{ height: '40px' }}>
                                        {
                                            DarkTheme ? <SunOutlined /> : <MoonOutlined />
                                        }
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="Header-search">
                            <Search className={DarkTheme ? "search-dark" : "search-light"} placeholder="Search products..." onSearch={onSearch} enterButton />

                        </div>
                        <div className="Header-block" style={{ display: discount_products.length !== 0 ? 'block' : 'none' }}>
                            <Carousel
                                height={180}
                                loop
                                plugins={[autoplay.current]}
                                onMouseEnter={autoplay.current.stop}
                                onMouseLeave={autoplay.current.reset}
                                nextControlIcon={<IconArrowRight style={{ width: 'rem(16)', height: 'rem(16)', zIndex: '3' }} />}
                                previousControlIcon={<IconArrowLeft style={{ width: 'rem(16)', height: 'rem(16)', zIndex: '3' }} />}
                            >
                                {discount_products?.map((item) => (
                                    <Carousel.Slide key={item.id}>
                                        <div key={item.id}>
                                            <img src={item.images[0].image} key={item.id} alt="" />
                                            <div style={{ display: item.discounts ? 'block' : 'none' }}>
                                                <div className="product-price">
                                                    <span className="product-price-prev">{item.discounts ? item.price : ''}</span>
                                                    <span className='product-price-next'>{item?.discount_price}</span>
                                                </div>
                                                <span className='product-discount'>{item.discounts?.is_active ? `-${item.discounts?.discount_rate}%` : ''}</span>
                                            </div>
                                        </div>
                                    </Carousel.Slide>
                                ))}
                            </Carousel>
                        </div>
                        <div className="Header-block-sec" style={{ display: discount_products.length !== 0 ? 'block' : 'none' }}>
                            <Carousel
                                height={180}
                                loop={true}
                                plugins={[autoplay.current]}
                                onMouseEnter={autoplay.current.stop}
                                onMouseLeave={autoplay.current.reset}
                            >
                                {discount_products.map(item => (
                                    <Carousel.Slide key={item.id}>
                                        <div className="Header-block-sec-product">
                                            <div className="Header-sec-product-image">
                                                <img src={item.images[0].image} alt="" />
                                            </div>
                                            <div className="Header-sec-product-info">
                                                <h2>{item.name}</h2>
                                                <p className="Header-sec-product-description">{item.description}</p>
                                                <div className="Header-block-sec-price">
                                                    <p>New Price:</p>
                                                    <div className="Header-block-sec-numbers">
                                                        <span className="Header-block-sec-prev">{item.price}</span>
                                                        <span className='Header-block-sec-next'>{item.discount_price}</span>
                                                    </div>
                                                </div>
                                                <span className='Header-block-sec-discount'>{item.discounts.is_active ? `-${item.discounts.discount_rate}%` : ''}</span>
                                            </div>
                                        </div>
                                    </Carousel.Slide>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                </header >
                <main>
                    <div className="container">
                        <Home_products />
                        <Home_order />
                        <Home_support />
                    </div>
                </main>
                <footer>
                    <div className="container">
                        <Home_footer />
                    </div>
                </footer>
            </div >
        );
    }
}

export default Header;
