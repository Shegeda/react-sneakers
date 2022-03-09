import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import AppContext from "./context";


function App() {

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      try {
        // const cartResponse = await axios.get('https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/cart')
        // const favoritesRespone = await axios.get('https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/favorites')
        // const itemsResponse = await axios.get('https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/items')

        const [cartResponse, favoritesRespone, itemsResponse] = await Promise.all([
          axios.get('https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/cart'),
          axios.get('https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/favorites'),
          axios.get('https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/items')
        ])

        setIsLoading(false)

        setCartItems(cartResponse.data)
        setFavorites(favoritesRespone.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert(error)
      }
    }
    fetchData()
  }, [])

  const onAddToCard = async (obj) => {
    const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id))
    try {
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/cart/${findItem.id}`)
      } else {
        const { data } = await axios.post('https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/cart', obj)
        setCartItems(prev => [...prev, data])
      }
      // setCartItems([...cartItems, obj]) так не правильно
    } catch (error) {
      alert(error)
      console.error(error)
    }
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/cart/${id}`)
      setCartItems(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      alert(error)
      console.error(error)
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/favorites/${obj.id}`)
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else {
        const { data } = await axios.post('https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/favorites', obj)
        setFavorites(prev => [...prev, data])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeValue = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }

  return (

    <AppContext.Provider
      value={{
        items,
        favorites,
        cartItems,
        isItemAdded,
        onAddToFavorite,
        onAddToCard,
        setCartOpened,
        setCartItems
      }}>
      <div className="wrapper clear">

        <Drawer items={cartItems}
          onRemove={onRemoveItem}
          onClose={() => setCartOpened(false)}
          opened={cartOpened} />
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route path="/" element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeValue={onChangeValue}
              onAddToFavorite={onAddToFavorite}
              onAddToCard={onAddToCard}
              isLoading={isLoading}
            />
          } />

          <Route path="/favorites" element={
            <Favorites />
          } />

          <Route path="/orders" element={
            <Orders />
          } />

        </Routes>

      </div>
    </AppContext.Provider>
  )

}

export default App;