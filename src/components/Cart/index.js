import Info from '../../pages/Info';
import styles from './Cart.module.scss'
import axios from 'axios';
import { useState } from 'react';
import { useCart } from '../../hooks/useCart'

function Cart({ opened, cartClose, removeItem }) {
	const { cartItems, setCartItems, totalPrice } = useCart();
	const [isOrderComplete, setIsOrderComplete] = useState(false);
	const [orderId, setOrderId] = useState(null);
	const [isLoading, setIsloading] = useState(false);
	const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));



	const onClickOrder = async () => {
		try {
			setIsloading(true)
			const { data } = await axios.post('https://61ba831548df2f0017e5aae9.mockapi.io/orders', { items: cartItems });
			setOrderId(data.id)
			setIsOrderComplete(true);
			setCartItems([]);

			for (let i = 0; i < cartItems.length; i++) {
				const item = cartItems[i];
				await axios.delete('https://61ba831548df2f0017e5aae9.mockapi.io/cart/' + item.id);
				await delay(1000);
			}

		} catch (error) {
			alert('Не удалось создать заказ!')
		}
		setIsloading(false)
	}

	return (

		<div className={`${styles.drawerOverlay} ${opened ? styles.drawerOverlayVisible : ''}`} >
			<div className={styles.drawerBlock}>
				<h2 className={styles.drawerCart}>Корзина<img onClick={cartClose} className={styles.btn} src="img/btn-remove.svg" alt="btn-remove" /></h2>
				{cartItems.length > 0 ?
					(<>
						< div className={styles.cartDrawer}>
							{cartItems.map((obj, index) => (
								<div key={index} className={styles.column}>
									<img className={styles.imgCart} src={obj.img} alt="sneakers" />
									<div className={styles.cartPrice}>
										<p>{obj.title}</p>
										<span>{obj.price} руб.</span>
									</div>
									<img className={styles.imgRemove} onClick={() => removeItem(obj)} src="img/btn-remove.svg" alt="btn-remove" />
								</div>
							))}

						</div>
						<div className={styles.drawerTotal}>
							<div className={styles.totalItem}>
								<span>Итого: </span>
								<div className={styles.line}></div>
								<b>{totalPrice} руб. </b>
							</div>
							<div className={styles.totalItem}>
								<span>Налог 5%:  </span>
								<div className={styles.line}></div>
								<b>{totalPrice / 100 * 5}.</b>
							</div>
						</div>
						<button disabled={isLoading} onClick={onClickOrder} className={styles.totalBtn}>Оформить заказ<span></span></button>
					</>) : (

						<Info
							title={isOrderComplete ? "Заказ оформлен!" : "Карзина пуста"}
							descrip={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
							image={isOrderComplete ? "/img/img8.jpg" : "/img/emp1.png"} />
					)}
			</div>
		</div >
	);
}
export default Cart;