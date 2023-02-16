import {Link} from "react-router-dom";
import {RiBearSmileLine} from "react-icons/ri";
import User from "./User";
import Button from "./ui/Button";
import {useAuthContext} from "../context/AuthContext";
import CartStatus from "./CartStatus";

export default function AppHeader() {
    const {user, login, logout} = useAuthContext();
    return (
        <header className='flex justify-between border-b border-gray-300 p-2 font-semibold'>
            <Link to='/' className='flex items-center text-4xl text-brand'>
                <RiBearSmileLine/>
                <h1 className='ml-1'>BBANG'S</h1>
            </Link>
            <nav className="flex items-center gap-4">
                <Link to='/products'>Products</Link>
                <Link to='/carts'>
                    <CartStatus/>
                </Link>
                {user && <User user={user}/>}
                {!user && <Button text={'Login'} onClick={login}/>}
                {user && <Button text={'Logout'} onClick={logout}/>}
            </nav>
        </header>
    )
}