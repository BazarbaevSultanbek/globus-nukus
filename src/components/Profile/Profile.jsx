import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal, Select, TextInput } from '@mantine/core';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import '../style/Profile.scss'
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { setUpDarkTheme } from '../../store/Reducers/Reducer';

function Profile() {
    const user = useSelector(state => state?.shop.currentUser)
    const DarkTheme = useSelector(state => state?.shop.isDarkMode)
    const dispatch = useDispatch()

    const [editInfo, setEditInfo] = useState(false)
    const [opened, { open, close }] = useDisclosure(false);

    const handleChangeTheme = () => {
        dispatch(setUpDarkTheme())
    }

    return (
        <div className={DarkTheme ? 'Profile-dark' : 'Profile'}>
            <Modal opened={opened} onClose={close} withCloseButton={false}>
                Your cashback balance:{user.cashback_balance}
            </Modal>
            <div className="container">
                <div className="Profile-header">
                    <h2>My Profile</h2>
                    <div className='Profile-header-navi'>
                        <div className="Profile-header-navi-theme">
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
                        <div className="Profile-header-navi-menu">
                            <input type="checkbox" id='profileCheck' />
                            <label htmlFor="profileCheck"><i className="fa-solid fa-bars"></i></label>
                            <ul className='Profile-header-menu-list'>
                                <label htmlFor="profileCheck"><i className="fa-solid fa-x"></i></label>
                                <li><Link to="/">Home</Link></li>
                                <li onClick={open}>My cashback</li>
                                <li>Liked Products</li>
                                <li><Link to={'/Cart'}>My cart</Link></li>
                                <li><Link to={'/MyCard'}>My cards</Link></li>
                                <li>My Orders</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="Profile-block">
                    <div className="Profile-block-status">
                        <h1>
                            <span>{user?.first_name.charAt(0)}</span>
                            <span>{user?.last_name.charAt(0)}</span>
                        </h1>
                    </div>

                    <div className="Profile-block-navi">
                        <h4>Account information</h4>
                        <div className="Profile-block-navi-editor">
                            <button>Edit Password</button>
                        </div>
                        <TextInput label="Phone Number" value={user?.phone} readOnly />
                    </div>
                    <div className="Profile-block-info">
                        <div className="Profile-block-info-navi">
                            <h4>Personal information</h4>
                            <div className="Profile-block-info-editor">
                                <button
                                    onClick={() => setEditInfo(true)}
                                >Edit</button>
                            </div>
                        </div>
                        <div className='Profile-block-info-items'>
                            <div className="Profile-info-items-inner">
                                {
                                    !editInfo ? <TextInput label="First Name" value={user?.first_name} readOnly /> :
                                        <TextInput label="First Name" value={user?.first_name} />
                                }

                                <TextInput label="Last Name" value={user?.last_name} readOnly />
                            </div>
                            <div className="Profile-info-items-inner">
                                <TextInput label="Date of Birth" value={user?.date_of_birth} readOnly />
                                <Select
                                    label="Gender"
                                    placeholder="Select your gender"
                                    value={user?.gender}
                                    data={[
                                        { value: 'male', label: 'Male' },
                                        { value: 'female', label: 'Female' },
                                    ]}
                                />
                            </div>
                        </div>

                    </div>
                    <div className='Profile-block-btn'>
                        <Button id="signOut">Sign out</Button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Profile
