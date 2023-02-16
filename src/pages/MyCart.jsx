import React from "react";
import CartItem from "../components/CartItem";
import PriceCard from "../components/PriceCard";
import {BsFillPlusCircleFill} from "react-icons/bs";
import {FaEquals} from "react-icons/fa";
import Button from "../components/ui/Button";
import useCart from "../hooks/useCart";


export default function MyCart() {
    const {
        cartQuery: {isLoading, data: products }
    } = useCart()
    const hasProducts = products && products.length > 0;
    const totalPrice = products && products.reduce((prev, cur) => prev + parseInt(cur.price) * cur.quantity,
        0
    );

    if(isLoading) return <p>Loading...</p>
    return (
        <section className='p-8 flex flex-col'>
            <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>내 장바구니</p>
            {!hasProducts && <p>장바구니에 상품이 없습니다. 열심히 쇼핑해주세요! </p>}
            {hasProducts &&
                <ul className='border-gray-300 border-b mb-8 p-4 px-8'>
                    {products.map((item) => (
                        <CartItem key={item.id} product={item}/>
                    ))}
                </ul>
            }
            <div className='flex justify-between items-center p-2 md:px-8 lg:px-16 mb-6'>
                <PriceCard text='상품 총액' price={totalPrice}/>
                <BsFillPlusCircleFill className='shrink-0'/>
                <PriceCard text='배송액' price={3000}/>
                <FaEquals className='shrink-0'/>
            </div>
            <Button
                text='주문하기'
            />
        </section>
    )
}