import { useContext, useState } from 'react';
import styles from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import { AppContext } from '../../App';

function Card({ onFavorite, onPlus, img, title, price, articul, id, favorites = false, isLoading }) {
	const { isItemAdded } = useContext(AppContext);
	const [isFavorites, setIsFavorites] = useState(favorites);
	const obj = { img, title, price, articul, id, perentId: id };
	const clickHandler = () => {
		onPlus(obj);

	};

	const clickHandleFavorites = () => {
		setIsFavorites(!isFavorites);
		onFavorite(obj);
	};

	return (

		<div className={styles.column}>
			{
				isLoading ? <ContentLoader
					speed={2}
					width={150}
					height={205}
					viewBox="0 0 150 185"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb">

					<rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
					<rect x="0" y="102" rx="3" ry="3" width="150" height="15" />
					<rect x="0" y="126" rx="3" ry="3" width="94" height="15" />
					<rect x="0" y="160" rx="8" ry="8" width="80" height="23" />
					<rect x="119" y="152" rx="8" ry="8" width="32" height="32" />
					<rect x="2" y="5" rx="0" ry="0" width="3" height="3" />
				</ContentLoader>

					:
					<div className={styles.item}>
						{onFavorite && <div className={styles.fevorite} onClick={clickHandleFavorites} ><img src={isFavorites ? "img/heart2.svg" : "img/heart1.svg"} alt="herz" /></div>}
						<img className={styles.img} src={img} alt="foto" />
						<p className={styles.text}>{title}</p>
						<div className={styles.items}>
							<div className={styles.price}>
								<span>Цена:</span>
								<b>{price} руб.</b>
							</div>
							{onPlus && <button className={isItemAdded(id) ? styles.btnActive : styles.btn} onClick={clickHandler}></button>}
						</div>
					</div>
			}

		</div>
	);
}

export default Card;