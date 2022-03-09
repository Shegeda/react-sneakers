import React, { useState } from 'react';
import ContentLoader from 'react-content-loader';

import AppContext from "../../context";

import styles from './Card.module.scss'

const Card = ({
  id,
  onFavorite,
  imageUrl,
  title,
  price,
  onPlus,
  favorited = false,
  loading
}) => {
  const { isItemAdded } = React.useContext(AppContext)
  const [isFavorite, setIsFavorite] = useState(favorited)
  const obj = { id, parentId: id, title, imageUrl, price }

  const onClickPlus = () => {
    onPlus(obj)
  }

  const onClickIsFavorite = () => {
    onFavorite(obj)
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={styles.card}>
      {
        loading ? <ContentLoader
          speed={2}
          width={210}
          height={225}
          viewBox="0 0 210 225"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"

        >
          <rect x="15" y="140" rx="5" ry="5" width="150" height="15" />
          <rect x="15" y="160" rx="4" ry="4" width="95" height="15" />
          <rect x="133" y="194" rx="8" ry="8" width="32" height="32" />
          <rect x="15" y="200" rx="8" ry="8" width="80" height="25" />
          <rect x="15" y="35" rx="5" ry="5" width="150" height="90" />
        </ContentLoader> :
          <>
            {onFavorite && (
              <div className={styles.favorite} onClick={onFavorite}>
                <img onClick={onClickIsFavorite} src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="Unliked" />
              </div>
            )}
            <img className={styles.imgSneakers} width={133} height={112} src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена: </span>
                <b>{price} грн.</b>
              </div>
              {onPlus && <img
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(id) ? "/img/btn-cheked.svg" : "/img/btn-plus.svg"} alt="Plus" />}
            </div>

          </>
      }
    </div>


  )
}

export default Card;