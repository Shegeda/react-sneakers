import { Link } from 'react-router-dom';


const Header = (props) => {
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="basketPointer mr-30">
          <img width={18} height={18} src="/img/cart.svg" alt="Cart" />
          <span>1205 грн.</span>
        </li>
        <li className="mr-20">
          <Link to="/favorites">
            <img width={18} height={18} src="/img/heart.png" alt="Heart" />
          </Link>
        </li>
        <li>
          <img width={20} height={20} src="/img/user.svg" alt="User" />
        </li>
      </ul>
    </header>
  )
}

export default Header;