import React, { useState } from 'react';
import styles from './Card.module.scss'

const Card = ({ onFavorite, imageUrl, title, price, onPlus }) => {
  const [isAdded, setIsAdded] = useState(false)

  const onClickPlus = () => {
    onPlus({title, price, imageUrl})
    setIsAdded(!isAdded)
  }
  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onFavorite}>
        <img src="/img/heart-unliked.svg" alt="Unliked" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена: </span>
          <b>{price} грн.</b>
        </div>
        <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/btn-cheked.svg" : "/img/btn-plus.svg"} alt="Plus" />
      </div>
    </div>
  )
}

export default Card;