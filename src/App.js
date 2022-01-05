import Home from "./pages/Home";
import Cart from "./components/Cart/";
import Header from "./Header";
import Favorits from "./pages/Favorits";
import { useEffect, useState, createContext } from 'react'
import axios from "axios";
import { Routes, Route } from 'react-router-dom';
import Order from "./pages/Order";


export const AppContext = createContext({});
function App() {
	const [items, setItems] = useState([]);
	const [cartOpen, setCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [favorites, setFavorites] = useState([]);
	const [isLoading, setIsloading] = useState(true);



	useEffect(() => {
		async function createAsyncFetch() {
			try {
				const [itemsResponse, cartResponse, favoriteResponse] = await Promise.all([
					axios.get('https://61ba831548df2f0017e5aae9.mockapi.io/items'),
					axios.get('https://61ba831548df2f0017e5aae9.mockapi.io/cart'),
					axios.get('https://61ba831548df2f0017e5aae9.mockapi.io/favorite')
				]);
				setIsloading(false)
				setCartItems(cartResponse.data);
				setFavorites(favoriteResponse.data);
				setItems(itemsResponse.data);
			}
			catch (error) {
				alert('Запрос не удался')
			}
		}
		createAsyncFetch();
	}, []);

	const onAddToCart = async (obj) => {
		const findItem = cartItems.find(item => item.perentId === obj.id)
		try {
			if (findItem) {
				setCartItems(prev => prev.filter((item) => item.perentId !== obj.id));
				await axios.delete(`https://61ba831548df2f0017e5aae9.mockapi.io/cart/${findItem.id}`);

			} else {
				setCartItems((prev) => [...prev, obj]);
				const { data } = await axios.post('https://61ba831548df2f0017e5aae9.mockapi.io/cart', obj);
				setCartItems((prev) => prev.map(item => {
					if (item.perentId === data.perentId) {
						return { ...item, id: data.id };
					} else {
						return item;
					}

				}));
			}
		}
		catch (error) {
			alert('не удалось добавить в Корзину')
		}

	}
	const addToFavorites = async (obj) => {
		const fintItem = favorites.find(favObj => favObj.perentId === obj.id);
		try {
			if (fintItem) {
				setFavorites(prev => prev.filter((item) => item.perentId !== obj.id));
				await axios.delete(`https://61ba831548df2f0017e5aae9.mockapi.io/favorite/${fintItem.id}`);

			} else {
				setFavorites(prev => [...prev, obj]);
				const { data } = await axios.post('https://61ba831548df2f0017e5aae9.mockapi.io/favorite', obj);
				setFavorites(prev => prev.map(item => {
					if (item.perentId === data.perentId) {
						return { ...item, id: data.id }
					} else {
						return item;
					}
				}));
			};
		}
		catch (error) {
			alert("Не удалось добавить в фавориты");
		}
	}

	const onRemoveItem = (obj) => {
		try {
			axios.delete(`https://61ba831548df2f0017e5aae9.mockapi.io/cart/${obj.id}`);
			setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
		} catch (error) {
			alert('Ошибкапри удалении')
		}


	}
	const changeHandle = (event) => {
		let val = event.target.value.trim();
		setSearchValue(val);

	}

	const clickClearHandle = () => {
		setSearchValue('')
	}

	const isItemAdded = (id) => {
		return cartItems.some(item => item.perentId === id)
	}

	return (
		<div className="wrapper">
			<AppContext.Provider value={{
				items,
				cartItems,
				favorites,
				isItemAdded,
				onAddToCart,
				addToFavorites,
				setCartOpen,
				setCartItems
			}} >
				<Header cartOpen={() => setCartOpen(true)} />
				<Cart opened={cartOpen} cartClose={() => setCartOpen(false)} removeItem={onRemoveItem} />
				<Routes>
					<Route exact path="/" element={<Home
						favorit={favorites}
						searchValue={searchValue}
						changeHandle={changeHandle}
						clickClearHandle={clickClearHandle}
						onAddToCart={onAddToCart}
						onFavorite={addToFavorites}
						isLoading={isLoading}

					/>} />

					<Route exact path="/favorites" element={<Favorits onFavorite={addToFavorites} />} />
					<Route exact path="/order" element={<Order />} />
				</Routes>
			</AppContext.Provider>
		</div >
	);
}

export default App;
