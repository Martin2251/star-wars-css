import "./App.css";
import React, { useEffect, useState } from "react";

function Card(props) {
  return (
    <div className="card">
      <h4>{props.character.name}</h4>
      <p>{props.character.height}</p>
      <p>{props.character.birth_year}</p>
      <p>{props.character.films.length}</p>
    </div>
  );
}
function App() {
  const [listCharacters, setListCharacters] = useState([]);
  const [nextUrl, setNextUrl] = useState("");

  useEffect(function () {
    fetch("https://swapi.dev/api/people/")
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        setListCharacters(data.results);
        setNextUrl(data.next);
      });
  }, []);
  // will change the state of the app
  function loadMore() {
    // fetch next URL
    fetch(nextUrl)
      .then(function (response) {
        return response.json();
      })
      //update the state
      .then(function (data) {
        setListCharacters([...listCharacters, ...data.results]);
        setNextUrl(data.next);
      });
  }

  return (
    <div className="App">
      <div className="card-container">
        {" "}
        {listCharacters.map(function (character) {
          return <Card character={character}></Card>;
        })}
      </div>

      <button onClick={loadMore}>Load More</button>
    </div>
  );
}

export default App;
