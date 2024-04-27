import { db } from '../data/db' 
import { useState, useEffect, useMemo } from 'react'

export const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [data, SetData] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MAX_QTY = 10

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function addToCart(item){
        const itemExist = cart.findIndex(guitar => guitar.id === item.id)
        if (itemExist != -1) {
            const updatedCart = [...cart]
            updatedCart[itemExist].quantity++
            setCart(updatedCart)
        } else {
            item.quantity = 1
            setCart(prevCart => ([...prevCart, item]))
        }
    }

    function removeFromCart(id){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    function increaseCart(id){
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_QTY) {
                return{
                    ...item,
                    quantity: item.quantity+1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function decreaseCart(id){
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > 1) {
                return{
                    ...item,
                    quantity: item.quantity-1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    function clearCart(){
        setCart([])
    }

    const isEmpty = useMemo(() => cart.length === 0, [cart])
    const totalPrice = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])


    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseCart,
        decreaseCart,
        clearCart,
        isEmpty,
        totalPrice
    }
}

