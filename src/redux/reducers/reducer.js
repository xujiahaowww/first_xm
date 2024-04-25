/* eslint-disable import/no-anonymous-default-export */
import {
    ADD_TO_USERINFO,
    ADD_TO_CART,
    UPDATE_CART,
    DELETE_FROM_CART
} from '../action/cart-actions';

const initialState = {
    userData: {},
    cart: [],
}
export function Int(state = initialState, action) {
    console.log(action, 'actionaction')
    switch (action.type) {
        case ADD_TO_USERINFO: {
            return {
                ...state,
                userData: { ...state.userData, ...action.userinfo }
            }
        }

        case ADD_TO_CART: {
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        }

        case UPDATE_CART: {
            return {
                ...state,
                cart: state.cart.map(item => item.product === action.payload.product ? action.payload : item)
            }
        }

        case DELETE_FROM_CART: {
            return {
                ...state,
                cart: state.cart.filter(item => item.product !== action.payload.product)
            }
        }

        default:
            return state;
    }
}
