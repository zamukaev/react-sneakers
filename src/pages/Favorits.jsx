import Card from "../components/Card";
import { AppContext } from '../App'
import { useContext } from "react";
function Favorits() {
	const { favorites, addToFavorites } = useContext(AppContext)

	return (
		<main className="main">
			<div className="content">
				<div className="content__block">
					<h1 className="content__title title">Мои закладки</h1>
				</div>
				<div className="content__card card">
					{favorites.map((item, index) => <Card
						key={item.articul + index.toString()}
						favorites={true}
						onFavorite={addToFavorites}
						{...item}
					/>)}
				</div>
			</div>
		</main >
	);
}
export default Favorits;