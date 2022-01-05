import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import Card from "../components/Card";
function Order() {
	const { } = useContext(AppContext);
	const [order, setOrder] = useState([]);
	const [isLoading, setIsloading] = useState(true)
	useEffect(() => {
		try {
			(async () => {
				const { data } = await axios.get('https://61ba831548df2f0017e5aae9.mockapi.io/orders');
				setOrder(data.map(item => item.items).flat());
				setIsloading(false)
			})()
		} catch (error) {
			alert('Заппос неудался в мои покупки')
		}

	}, [])

	return (
		<main className="main">
			<div className="content">
				<div className="content__block">
					<h1 className="content__title title">Мои покупки</h1>
				</div>
				<div className="content__card card">
					{(isLoading ? [...Array(4)] : order).map((item, index) => (
						<Card
							key={index.toString()}
							isLoading={isLoading}
							{...item}
						// added={cartItems.some(elem => elem.articul === item.articul)}
						// favorites={favorites.some(elem => elem.articul === item.articul)}
						/>
					))}
				</div>
			</div>
		</main >
	);
}
export default Order;