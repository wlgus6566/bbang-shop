import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addOrUpdateToCart, getCart, removeFromCart} from "../api/firebase";
import {useAuthContext} from "../context/AuthContext";
export default function useCart() {
    const queryClient = useQueryClient();
    const {uid} = useAuthContext();


    const cartQuery = useQuery(['carts', uid || ''], () => getCart(uid),
        {
            enabled: !!uid,//사용자가 없는 경우엔 캐시되지 않도록
        })

    const addOrUpdateItem = useMutation(
        (product) => addOrUpdateToCart(uid,product),
        {
            onSuccess: () => queryClient.invalidateQueries(['carts', uid]) // 한 컴퓨터에서 다른 계정 접속할 떄 invalidate되지 않게
        }
    )

    const removeItem = useMutation(
        (id) => removeFromCart(uid, id), {
            onSuccess: () => {
                queryClient.invalidateQueries(['carts', uid])
            }
        }
    )
    return {cartQuery, addOrUpdateItem, removeItem}
}
