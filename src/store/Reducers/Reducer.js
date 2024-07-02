import { createSlice } from '@reduxjs/toolkit'

const shopSlice = createSlice({
    name: 'globus-nukus',
    initialState: {
        currentUser: null,
        products: [],
        categories: [],
        LikedProducts: [],
        cart: [],
        total: 0,
        isDarkMode: false,
    },
    reducers: {
        setUpState(state, action) {
            state.products = action.payload.products;
            state.categories = action.payload.categories;
        },
        setCurrentUser(state, action) {
            state.currentUser = action.payload
        },
        setUpDarkTheme(state, action) {
            state.isDarkMode = !state.isDarkMode;
        },
        addLikeProduct(state, action) {
            state.LikedProducts = action.payload
        },
        addProToCart(state, action) {
            state.cart.push(action.payload);
        },
        addCountProduct(state, action) {
            const product = state.cart.find(item => item.product.id === action.payload.id);
            if (product) {
                if (action.payload.status === 'plus') {
                    product.count += 1;
                } else if (action.payload.status === 'minus') {
                    if (product.count > 1) {
                        product.count -= 1;
                    } else {
                        state.cart = state.cart.filter(item => item.product.id !== action.payload.id);
                    }
                }
            }
        }
    },
})

export const { setUpState, setCurrentUser, setUpDarkTheme, addLikeProduct, addProToCart, addCountProduct, } = shopSlice.actions
export default shopSlice.reducer