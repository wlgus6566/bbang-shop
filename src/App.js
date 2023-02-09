import './App.css';
import {Outlet} from "react-router-dom";
import AppHeader from "./components/AppHeader";
import StickyItem from "./components/StickyItem";

function App() {
  return (
    <>
        <AppHeader/>
        <Outlet/>
        <StickyItem/>
    </>
  );
}

export default App;
