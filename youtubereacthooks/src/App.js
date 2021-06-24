import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import './App.css';
import {Component , useState,useEffect } from 'react';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import Resultado from './components/Resultado';
import { getPokemonData, getPokemons, searchPokemon } from './api';
import { FavoriteProvider } from "./contexts/favoriteContext";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";

const localStoragekey = "favorite_pokemon";

export default function App(){
  const [pokemons,setPokemons]= useState([]);
  const [pagina,setPagina]= useState(0);
  const [total,setTotal]= useState(0);
  const [loading,setLoading]= useState(true);
  const [favoritos,setFavorites] = useState([]);
  const [notFound,setNotFound]= useState(false);
  const [searching,setSearching]= useState(false);

  const adminUser = {email:"juan@mail.com",password:"point"}
  const [user,setUser] = useState({name:"",email:""});
  const [error,setError]=useState("");

  const Login = details=>{
    console.log(details);

    if(details.email == adminUser.email && details.password == adminUser.password){
      console.log("Ingreso..!")
      setUser({
        name:details.name,
        email:details.email
      })
    }else{
      console.log("Credenciales erróneas..!")
      setError("Credenciales erróneas..!");
    }
      
  }

  const Logout = ()=>{
    console.log("Logout");
    setUser({name:"",email:""});
  } 
  /* 
      this.state = { 
        data: [],
        pokemons:[],
        pagina:[],
        setPage:[],
        total:[],
        loading:true,
        isFetch:true,
      }; */
       
     //Trae los pokemones desde la API
  const fetchPokemons = async () =>{
    try{
      setLoading(true);
      const datap = await getPokemons(27,27*pagina);
      console.log('fetchPokemons',datap)
      //this.setState({pokemons:datap.results});
      //Crea 10 promesas diferentes
      const promises = datap.results.map(async(pokemon)=>{
        return await getPokemonData(pokemon.url)
      });
      const results = await Promise.all(promises);
      console.log('',datap)
      setPokemons(results)
      setLoading(false);
      setTotal(Math.ceil(datap.count / 25))//retorna entero mas proximo
      setNotFound(false);//Cuando se borra lo del searh llama de nuevo a las tarjetas
    }catch(e){

    }
  };

  //Almacena los pokemones seleccionados
  const loadFavoritePokemons = () =>{
    const pokemons = JSON.parse(window.localStorage.getItem(localStoragekey)) || [];
    setFavorites(pokemons)
  }

  //Contiene la lista de dependencias de los pokemosnes favoritos
  useEffect(()=>{
    loadFavoritePokemons ();
  },[])


  //Contiene la lista de dependencias
  useEffect(()=>{
    if(!searching){ //si no estamos buscando no obtenemos los pokemones
    fetchPokemons();
    }
  },[pagina])
  
  //Funcion q llama al contexto del pokemon
  const updateFavoritePokemons =(name)=>{
    const update = [...favoritos]
    console.log('updateFavoritePokemons',name);
    const isFavorite = update.indexOf(name);
    if(isFavorite >=0){
      update.splice(isFavorite,1);//quita 1 
    }else{
      update.push(name);
    }
    setFavorites(update);
    //Almacena la cantidad de favoritos y las pasa a un JSON
    window.localStorage.setItem(localStoragekey,JSON.stringify(update));
  }

  //Busca el pokemon mediante la api
  const onSearch = async (pokemon) =>{
    //Con clic en eboton del search si esta vacio busca los pokemones que estaban antes.
    if(!pokemon){
      return fetchPokemons();
    }

    setLoading(true);
    setNotFound(false);
    setSearching(true);
    const result = await searchPokemon(pokemon);
    if(!result){
       setNotFound(true);
       setLoading(false);
       return;
    }else{
      setPokemons([result]);
      setPagina(0);//valora de la paginacion
      setTotal(1);//valor de la paginacion
    }
    setLoading(false);
    setSearching(false);
  }

  return <BrowserRouter>
      <React.Fragment>
          <Switch>
              <Route exact path="/"  component={LoginForm}>
                  {(user.email != "")?(
                    <div className="welcome">
                      <h2>Bienvenido, <span>{user.name}</span> <button onClick={Logout}>SALIR</button></h2>
                      <div>
                        <Link to="/FavoriteProvider">
                        POKEMONES
                        </Link>
                      </div>
                      
                    </div>
                  ):(
                    <LoginForm Login={Login} error={error}/>
                  )}
              </Route>

              <Route path="/FavoriteProvider">
                  <FavoriteProvider value={{ favoritePokemons:favoritos, updateFavoritePokemons:updateFavoritePokemons }}>
                      <div>
                        {/* <Funcion></Funcion> */}
                        {/* <Form></Form> */}
                        <Navbar/>
                        <div className="App">
                        <Searchbar onSearch={onSearch}/>
                        {/*  {loading ? ( <div>Cargando Pokemones..🚀</div>):( //Si loading es TRUE hace esto this.setState({loading:false}); */}
                        {notFound? (
                          <div> 
                          <p>NO EXISTE COINCIDENCIAS🚀!! <br/><a href="https://github.com/jcuyaguari">github.com/jcuyaguari</a></p>
                          </div>
                        ):(
                          <Resultado loading={loading} pokemons={pokemons} pagina={pagina} setPage={setPagina} total={total}/>
                        )}
                        {/*  )} */}
                        </div>
                        <Footer/>
                      </div>
                  </FavoriteProvider>
              </Route>
          </Switch>
      </React.Fragment>
    </BrowserRouter>
}
