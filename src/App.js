import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Route, Routes, NavLink, Link } from 'react-router-dom';

import CharacterDetails from "./components/characterDetails"

function App() {

  console.log("APP is invoked")


  const [charactersArr, setCharactersArr] = useState(null);

  useEffect(() => {
    getCharactersFromApi()
  }, []);
    console.log("sending request to get the list of characters....")



  const getCharactersFromApi =() => {
    axios.get(`${process.env.REACT_APP_API_URL}/characters`)
      .then( response => {
        setCharactersArr(response.data);
      })
      .catch( e => console.log(e))
    }


  const renderListOfCharacters = () => {
    if(charactersArr === null){
      return <p>loading....</p>;
    } else {
      return charactersArr.map((characterObj) => {
        return (
          <div key={characterObj.id} className="character box">
            Name: {characterObj.name} <br />
            Weapon: {characterObj.weapon} <br />
            <Link to={`/characters/${characterObj.id}`}>More details</Link>
          </div>
        )
      })
    }
  }

  return (
    <div className="App">
      <h1>React Charates App</h1>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      

      <Routes>
        <Route path='/' element={renderListOfCharacters()} />
        <Route path='/contact' element={<p>Display Contact page</p>} />
        <Route path="/characters/:characterId"  element={<CharacterDetails callbackToUpdateList={getCharactersFromApi}/>} />
      </Routes>


    </div>
  );
}

export default App;
