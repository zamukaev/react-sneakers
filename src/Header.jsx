import { Link } from 'react-router-dom'
import { useCart } from './hooks/useCart';

function Header(props) {
	const { totalPrice } = useCart();

	return (
		<header className="header">
			<div className='item-block'>
				<div className="item-block__cart" onClick={props.cartOpen}><img src="img/cart.svg" alt="cart" /></div>
				<div className="item-block__favorits"><Link to="/favorites"><img src="img/heartF.svg" alt="heartF" /></Link></div>
				<div className="item-block__user"><Link to="/order"><img src="img/user.svg" alt="user" /></Link></div>
			</div>

			<Link to="/" className="header__left">
				<img className="header__logo" src="img/logo.png" alt="" />
				<div className="header__info">
					<h3 className="header__title title">react sneakers</h3>
					<p className="header__text">Магазин лучших кроссовок</p>
				</div>
			</Link>

			<ul className="header__right">
				<li className="header__cart cart" onClick={props.cartOpen}>
					<img className="cart__img" src="img/cart.svg" alt="" />
					<span>{totalPrice} руб.</span>
				</li>
				<li className="header__heart">
					<Link to="/favorites">
						<img src="img/heartF.svg" alt="heartF" />
					</Link>
				</li>
				<Link to="/order">
					<li className="header__user  user">
						<img className="user__img" src="img/user.svg" alt="user" />
					</li>
				</Link>
			</ul>
		</header>
	);
}

export default Header;