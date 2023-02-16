import React from "react";
import {Link} from "react-router-dom";
import {BsFillPencilFill} from "react-icons/bs";
import {useAuthContext} from "../context/AuthContext";

export default function StickyItem() {
    const {user} = useAuthContext();
    return (
        <>
            {user && <Link to='/products/new' className='text-2xl fixed right-5 bottom-5 border-2 border-indigo-500/100 p-3 rounded-full hover:shadow-lg'>
                <BsFillPencilFill/>
            </Link>}
        </>

    )
}