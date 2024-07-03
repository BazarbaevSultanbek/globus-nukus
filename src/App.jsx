import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications';
import Header from './components/Home/Home_header'
import Login from './components/Login/Login'
import Categories from './components/Categories/Categories'
import Cart from './components/Profile/Cart';
import Registration from './components/Registration/Registration'
import Validation from './components/Registration/Validation'
import ChangePassword from './components/Profile/ChangePassword'
import PasswordValidate from './components/Profile/PasswordValidation'
import Profile from './components/Profile/Profile';
import CardValidation from './components/Profile/CardValidation';
import MyCard from './components/Profile/MyCard';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import Product from './components/Product/Product';

function App() {
  return (
    <BrowserRouter>
      <MantineProvider>
        <Notifications position="top-right" zIndex={2077} />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route path="/myProfile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path='/PasswordValidate' element={<PasswordValidate />} />
          <Route path='/Validation' element={<Validation />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/Product/:id" element={<Product />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path='/MyCard' element={<MyCard />} />
          <Route path="/CardValidate" element={<CardValidation />} />
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  )
}

export default App
