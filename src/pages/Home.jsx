import { useContext } from "react";
import { AppContext } from "../App";
import Card from "../components/Card/";
function Home({
	searchValue,
	changeHandle,
	clickClearHandle,
	onAddToCart,
	onFavorite,
	isLoading
}) {
	const { items, cartItems, favorites } = useContext(AppContext)
	const renterCard = () => {
		const filterItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
		return (isLoading ? [...Array(12)] : filterItems)
			.map((item, index) => < Card
				key={index}
				onPlus={(obj) => onAddToCart(obj)}
				onFavorite={(obj) => onFavorite(obj)}
				added={cartItems.some(elem => elem.perentId === item.id)}
				favorites={favorites.some(elem => elem.perentId === item.id)}
				isLoading={isLoading}
				{...item}
			/>)


	}
	return (
		<main className="main">
			<div className="content">
				<div className="content__block">
					<h1 className="content__title title">{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все красовки'} </h1>
					<div className="search">
						<img src="img/search.svg" alt="search" />
						<input type="text" onChange={changeHandle} value={searchValue} placeholder="Поиск..." />
						{searchValue && <span className="clear" onClick={clickClearHandle}></span>}
					</div>
				</div>
				<div className="content__card card">
					{renterCard()}

				</div>
			</div>
		</main>
	);
}
export default Home;