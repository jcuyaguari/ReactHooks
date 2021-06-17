import React from 'react';
import FavoriteContext from '../contexts/favoriteContext';

const {useContext} = React;

const Navbar = ()=>{
    const {favoritePokemons} = useContext(FavoriteContext);
    console.log('-->',favoritePokemons,'<--')
    let urlimg = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";
    return (
        <nav>
            <div>
            <img src= {urlimg} alt="logo" className="navbar-logo"></img>
            </div>
            <div>
                🏠{favoritePokemons.length}  
            </div>
        </nav>
    )    
}

export default Navbar;