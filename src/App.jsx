import React from 'react'
import { useState, useEffect } from 'react'
import  Header  from './components/Header'
import Guitar from './components/Guitar'
import { db } from './data/db' 
 
function App() {

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

    return (
    <>
<Header
    cart={cart}
    removeFromCart={removeFromCart}
    increaseCart={increaseCart}
    decreaseCart={decreaseCart}
    clearCart={clearCart}
/>
<main className="container-xl mt-5">
    <h2 className="text-center">Nuestra Colección</h2>

    <div className="row mt-5">
        {data.map((guitar) => (
            <Guitar
                key={guitar.id}
                guitar={guitar}
                setCart={setCart} 
                addToCart={addToCart}
            />
        )) }
    </div>
</main>


<footer className="bg-dark mt-5 py-5">
    <div className="container-xl">
        <p className="text-white text-center fs-4 mt-4 m-md-0">Liano</p>
    </div>
</footer>
</>

  )
}

export default App
