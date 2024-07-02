import { useDisclosure } from '@mantine/hooks';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../style/Cart.scss'
import { Button, Modal } from '@mantine/core';
import { Link } from 'react-router-dom';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { addCountProduct, setUpDarkTheme } from '../../store/Reducers/Reducer';

function Cart() {
    const user = useSelector(state => state?.shop.currentUser)
    const cart = useSelector(state => state?.shop.cart)
    const DarkTheme = useSelector(state => state?.shop.isDarkMode)
    const dispatch = useDispatch()
    const [opened, { open, close }] = useDisclosure(false);
    const handleChangeTheme = () => {
        dispatch(setUpDarkTheme())
    }


    if (cart.length === 0 || cart === '[]') {
        return (
            <div className={DarkTheme ? 'Cart-dark-empty' : 'Cart-empty'}>
                <h1> Cart is currently empty!</h1 >
            </div >
        )
    }
    return (
        <div className={DarkTheme ? 'Cart-dark' : 'Cart'}>
            <Modal opened={opened} onClose={close} withCloseButton={false}>
                Your cashback balance:{user.cashback_balance}
            </Modal>

            <div className="container">
                <div className="Cart-header">
                    <h2>My Carts</h2>
                    <div className='Cart-header-navi'>
                        <div className="Cart-header-navi-theme">
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
                        <div className="Cart-header-navi-menu">
                            <input type="checkbox" id='CartCheck' />
                            <label htmlFor="CartCheck"><i className="fa-solid fa-bars"></i></label>
                            <ul className='Cart-header-menu-list'>
                                <label htmlFor="CartCheck"><i className="fa-solid fa-x"></i></label>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to={"/MyProfile"}>My Profile</Link></li>
                                <li onClick={open}>My cashback</li>
                                <li>Liked Products</li>
                                <li><Link to={'/Cart'}>My cart</Link></li>
                                <li>My Orders</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="Cart-block">
                    <ul className="Cart-block-list">
                        {
                            cart.map((product) => (
                                <li key={product.product.id}>
                                    <div className='Cart-list-item-photo'>
                                        <img src={product.product.images[0].image} alt="" />
                                    </div>
                                    <div className='Card-list-item-info'>
                                        <span>{product.product.name}</span>
                                        <div className='Card-list-info-count'>
                                            <Button onClick={() => dispatch(addCountProduct({ id: product.product.id, status: 'minus' }))}>-</Button>
                                            <p>{product.count}</p>
                                            <Button onClick={() => dispatch(addCountProduct({ id: product.product.id, status: 'plus' }))}>+</Button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                        <Button color='green'>Checkout</Button>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cart
