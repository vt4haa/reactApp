import { createContext, useContext, useEffect, useState } from "react";
import { fakeFetchCrypto, fetchAssets } from "../api";
import { percentDifference } from "../utils";

const CryptoContext = createContext({
	asserts: [],
	crypto: [],
	loading: false,
});

export function CryptoContextProvider({ children }) {
	const [loading, setLoading] = useState(false);
	const [crypto, setCrypto] = useState([]);
	const [assets, setAssets] = useState([]);

	function mapAsset(asset, result) {
		return assets.map(asset => {
			const coin = result.find((c) => c.id === asset.id);
			return {
			grow: asset.price < coin.price,
			growPercent: percentDifference(asset.price, coin.price),
			totalAmount: asset.amount * coin.price,
			totalProfit: asset.amount * coin.price - asset.amount * asset.price,
			...asset,
		};
		})
		
	}

	useEffect(() => {
		async function preLoad() {
			setLoading(true);
			const { result } = await fakeFetchCrypto();
			const assets = await fetchAssets();

			setAssets(mapAsset(assets, result));
			setCrypto(result);
			setLoading(false);
		}
		preLoad();
	}, []);

	function addAsset(newAsset) {
		setAssets((prev) => [prev, newAsset], crypto) 
	}

	return (
		<CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
			{children}
		</CryptoContext.Provider>
	);
}

export default CryptoContext;

export function useCrypto() {
	return useContext(CryptoContext);
}
