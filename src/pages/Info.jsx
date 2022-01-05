
import { useContext } from 'react';
import { AppContext } from '../App';
import styles from '../components/Cart/Cart.module.scss'
function Info({ image, title, descrip }) {
	const { setCartOpen } = useContext(AppContext)

	return (
		<div className={styles.empty}>
			<div className={styles.emptyBlock}>
				<img src={image} alt="empty" className={styles.emptyImg} />
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.text}>{descrip}</p>
				<button onClick={() => setCartOpen(false)} className={styles.emptyBtn}><span></span>Вернуться назад</button>
			</div>
		</div>
	);
}

export default Info;