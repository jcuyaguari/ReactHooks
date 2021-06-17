import React,{useState,useEffect}  from "react";
import { searchPokemon } from "../api"
import Search from '@material-ui/icons/Search'

const Searchbar = (props) =>{
    const{onSearch} = props;
    const[busqueda,setBusqueda]= useState("");
    const[pokemon,setPokemon]=useState();

    const onChange = (e)=>{
        setBusqueda(e.target.value)
        if(e.target.value.length === 0){
            setBusqueda(null);
        }
    }

    const onClick = async(e)=>{
        /* const data = await searchPokemon(busqueda);
        setPokemon(data); */
        onSearch(busqueda);
    }

    return (
        <div className="searchbar-container">
            <div className="searchbar">
                <input placeholder="BUSCAR" onChange={onChange}></input>
            </div>
                
            <div className="searchbar-btn">
                <button starticon={<Search/>} onClick={onClick}>BUSCAR</button>
                <a>{busqueda}</a>
            </div>
            
        </div>
    )
}

export default Searchbar;