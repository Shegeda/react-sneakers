import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {

    fetch('https://61a3f974d5e8330017292209.mockapi.io/react-sneakers/items')
      .then(res => res.json())
      .then(json => setItems(json))
      
    // .catch(alert("Опаньки... Что-то пошло не так! Чекни интернет плиз :)"))
  }, [])

  const onAddToCard = (obj) => {
    // setCartItems([...cartItems, obj]) так не правильно
    setCartItems(prev => [...prev, obj ])
    // if (cartItems === obj) {
    //   return setCartItems(prev => [...prev])
    // }
  }

   
  return (

    <div className="wrapper clear">

      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-40">

        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          
          {items.map(item => (
            <Card
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log('Добавили в избранное')}
              onPlus={obj => onAddToCard(obj)} />
          ))}
        </div>

      </div>
    </div>
  )

}

export default App;