import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    axios.get('https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/items')
      .then(res => setItems(res.data))
      .catch(error => alert(error))

    axios.get('https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/cart')
      .then(res => setCartItems(res.data))
      .catch(error => alert(error))


    axios.get('https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/favorites')
      .then(res => setFavorites(res.data))
      .catch(error => alert(error))
    // Метод FETCH
    //   fetch('https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/items')
    //     .then(res => res.json())
    //     .then(json => setItems(json))

  }, [])

  const onAddToCard = (obj) => {
    axios.post('https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/cart', obj)

    // setCartItems([...cartItems, obj]) так не правильно
    setCartItems(prev => [...prev, obj])
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id))

  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favObj => favObj.id === obj.id)) {
        axios.delete(`https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/favorites/${obj.id}`)
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

  return (

    <div className="wrapper clear">

      {cartOpened && <Drawer items={cartItems} onRemove={onRemoveItem} onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route path="/" element={
          <Home
            items={items}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeValue={onChangeValue}
            onAddToFavorite={onAddToFavorite}
            onAddToCard={onAddToCard}
          />
        } />

        <Route path="/favorites" element={
          <Favorites
            items={favorites}
            onAddToFavorite={onAddToFavorite}
          />
        } />

      </Routes>

    </div>
  )

}

export default App;