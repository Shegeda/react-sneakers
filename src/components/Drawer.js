

const Drawer = ({ onClose, onRemove, items = [] }) => {
  return (
    <div className="overlay">

      <div className="drawer">
        <h2 onClick={onClose} className=" d-flex justify-between mb-30">Корзина<img className="removeBtn" src="/img/btn-remove.svg" alt="Close" />
        </h2>

        {
          items.length > 0 ? (
            <div>
              <div className="items flex">
                {
                  items.map(obj => (
                    <div className="cartItem d-flex align-center mb-20">
                      <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg"></div>
                      <div className="mr-20 flex">
                        <p className="mb-5">{obj.title}</p>
                        <b>{obj.price} грн.</b>
                      </div>
                      <img className="removeBtn" onClick={() => onRemove(obj.id)} src="/img/btn-remove.svg" alt="Remove" />
                    </div>
                  ))

                }

              </div>
              <div className="cartTotalBlock">
                <ul>
                  <li>
                    <span>Итого:</span>
                    <div></div>
                    <b>21 498 грн. </b>
                  </li>
                  <li>
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>1074 грн. </b>
                  </li>
                </ul>
                <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow" /></button>
              </div>
            </div>
          ) : (
            <did className="cartEmpty align-cener justify-center flex-column">
              <img className="mb-20" width="120px" height="120px" src="/img/empty-cart.jpg" alt="Empty-cart" />
              <h2>Корзина пустая</h2>
              <p className="opacity-6">Добавьте хотя бы одну пару кросовок, чтобы сделать заказ</p>
              <button onClick={onClose} className="greenButton">
                <img src="/img/arrow.svg" alt="Arrow" />
                Вурнуться назад
              </button>
            </did>
          )}
      </div>
    </div>
  )
}

export default Drawer;