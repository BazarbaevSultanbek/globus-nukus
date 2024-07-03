import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Modal, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications';
import React, { useState, useEffect } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import axios from 'axios';
import '../style/MyCard.scss'
import { setUpDarkTheme } from '../../store/Reducers/Reducer';





function MyCard() {
    const user = useSelector(state => state?.shop.currentUser)
    const DarkTheme = useSelector(state => state?.shop.isDarkMode)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const card_tokens = JSON.parse(localStorage.getItem('card_tokens'))
    const [cards, setCards] = useState([])



    /// modal close and open 
    const [opened, { open, close }] = useDisclosure(false);
    const [openCard, { open: openCardModal, close: closeCardModal }] = useDisclosure(false);


    /// consts for card number and expiry date
    const [cardNumber, setCardNumber] = useState('')
    const [dateCard, setDateCard] = useState('');


    /// change card number format
    const handleChangeCardNumber = (event) => {
        let input = event.target.value.replace(/\D/g, '');
        let formattedInput = '';
        for (let i = 0; i < input.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedInput += ' ';
            }
            formattedInput += input[i];
        }
        setCardNumber(formattedInput);
    };

    /// change card expire date format
    const handleChange = (event) => {
        let input = event.target.value.replace(/\D/g, '');
        if (input.length > 2) {
            input = `${ input.slice(0, 2) } /${input.slice(2)}`;
        }
        setDateCard(input);
    };


    /// add card by fetch request
    const addNewCard = async () => {
        try {
            const request = await axios.post('https://globus-nukus.uz/api/cards/create_card', {
                card_number: cardNumber,
                expire: dateCard
            })
            await axios.post('https://globus-nukus.uz/api/cards/get_verify_code', {
                token: request.data.data.card.token
            })

            navigate('/CardValidate', { state: { token: request.data.data.card.token, card_number: cardNumber, expire: dateCard } });
        }
        catch (error) {
            showNotification({
                title: "Error adding Card",
                message: error?.message || 'Error',
                color: 'red',
            })
        }
        finally {
            setCardNumber(''),
                setDateCard('')
        }
    }

    useEffect(() => {
        const getCardInfo = async () => {
            if (card_tokens) {
                const fetchedCards = [];
                for (const card_token of card_tokens) {
                    try {
                        const response = await axios.post('https://globus-nukus.uz/api/cards/check_card', {
                            token: card_token
                        });
                        fetchedCards.push(response.data.data.card);
                    } catch (error) {
                        console.error(error);
                    }
                }
                setCards(fetchedCards);
            }
        };
        getCardInfo();
    }, []);


    const handleChangeTheme = () => {
        dispatch(setUpDarkTheme())
    }


    return (
        <div className={DarkTheme ? 'Card-dark' : 'Card'}>
            <Modal opened={opened} onClose={close} withCloseButton={false}>
                Your cashback balance:{user.cashback_balance}
            </Modal>

            <Modal opened={openCard} onClose={closeCardModal} title="Add Card">
                <TextInput
                    data-autofocus
                    label="First input"
                    placeholder="First input"
                    value={cardNumber}
                    onChange={handleChangeCardNumber}
                    maxLength={19}
                />
                <TextInput
                    label="Date of Expiry"
                    placeholder="MM/YY"
                    mt="md"
                    value={dateCard}
                    onChange={handleChange}
                    maxLength={5}
                />
                <Button onClick={() => addNewCard()}>Add Card</Button>
            </Modal>

            <div className="container">
                <div className="Card-header">
                    <h2>My Cards</h2>
                    <div className='Card-header-navi'>
                        <div className="Card-header-navi-theme">
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
                        <div className="Card-header-navi-menu">
                            <input type="checkbox" id='cardCheck' />
                            <label htmlFor="cardCheck"><i className="fa-solid fa-bars"></i></label>
                            <ul className='Card-header-menu-list'>
                                <label htmlFor="cardCheck"><i className="fa-solid fa-x"></i></label>
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
                <div className="Card-block">
                    <ul className="Card-block-list">
                        <li onClick={openCardModal}>
                            Add New Card
                            <i className="fa-solid fa-plus"></i>
                        </li>
                        {
                            cards.map((card) => (
                                <li key={card.number}>
                                    <span>
                                        <i className="fa-solid fa-credit-card" style={{ color: 'rgb(20, 190, 20)' }}></i>
                                        {card.number}
                                    </span>
                                    <Checkbox mt="md" />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default MyCard;


