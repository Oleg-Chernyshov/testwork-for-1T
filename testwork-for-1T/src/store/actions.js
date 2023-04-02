// export const GET_PRODUCTS = ({ commit }) => {
// 	const fetching = async () => {
// 		try {
// 			const { onResult } = useQuery(
// 				gql`
// 	         query MyQuery {
// 	           products {
// 	             category
// 	             discount
// 	             gender
// 	             name
// 	             oldprice
// 	             todayprice
// 	             url
// 	           }
// 	         }
// 	       `
// 			);
// 			onResult(queryResult => {
// 				commit("setProducts", { products: queryResult?.data?.products, productsFilter: queryResult?.data?.products, loading: queryResult.loading })
// 			})
// 		} catch (e) {
// 			console.log("Ошибка:", e);
// 		}
// 	};
// 	fetching();
// }