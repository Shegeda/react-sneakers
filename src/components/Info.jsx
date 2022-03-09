import React from 'react';
import AppContext from '../context';

const Info = ({ title, image, description }) => {
  const { setCartOpened } = React.useContext(AppContext)

  return (
    <div className="cartEmpty align-cener justify-center flex-column">
      <img className="mb-20" width="120px" src={image} alt="Empty-cart" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCartOpened(false)} className="greenButton">
        <img src="/img/arrow.svg" alt="Arrow" />
        Вурнуться назад
      </button>
    </div>
  )
}

export default Info;