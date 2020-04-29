import React, { useState, useEffect } from "react";

import SelectPokemon from "./components/pokemons";

import alakazam from "./assets/images/alakazam.png";
import blastoise from "./assets/images/blastoise.png";
import bulbasaur from "./assets/images/bulbasaur.png";
import charizard from "./assets/images/charizard.png";
import flareon from "./assets/images/flareon.png";
import gengar from "./assets/images/gengar.png";
import haunter from "./assets/images/haunter.png";
import pikachu from "./assets/images/pikachu.png";
import vileplume from "./assets/images/vileplume.png";

const pokemons = [
  "alakazam",
  "blastoise",
  "bulbasaur",
  "charizard",
  "flareon",
  "gengar",
  "haunter",
  "pikachu",
  "vileplume"
];

function App() {

  const [chosen, setChosen] = useState("alakazam");
  const [pokemonImg, setPokemonImg] = useState(alakazam);
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [pokemonType, setPokemonType] = useState("psychic");
  const [type, setType] = useState("psychic");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");


  useEffect(() => {
    async function fetchPokemon() {
      try {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${chosen}/`)
        
          .then(response => {
            return response.json();
          })

          .then(data => {
            setPokemonInfo({ ...pokemonInfo, [chosen]: data });
            setTitle("");
            setText("");
          });

      } catch (err) {
        console.log(err);
      }

    }
    fetchPokemon();
  }, [chosen]);

  useEffect(() => {
    switch (pokemonType) {
      case "psychic":
        setType("psychic");
        break;
      case "water":
        setType("water");
        break;
      case "poison":
        setType("poison");
        break;
      case "flying":
        setType("flying");
        break;
      case "fire":
        setType("fire");
        break;
      case "electric":
        setType("electric");
        break;
      default:
        console.log("Loading...");
    }
  }, [pokemonType]);

  function getType(feature) {
    switch (feature) {
      case "speed":
        return pokemonInfo[chosen]?.stats[0]?.base_stat;
      case "specialDefense":
        return pokemonInfo[chosen]?.stats[1]?.base_stat;
      case "specialAttack":
        return pokemonInfo[chosen]?.stats[2]?.base_stat;
      case "defense":
        return pokemonInfo[chosen]?.stats[3]?.base_stat;
      case "attack":
        return pokemonInfo[chosen]?.stats[4]?.base_stat;
      case "hp":
        return pokemonInfo[chosen]?.stats[5]?.base_stat;
      case "weight":
        return pokemonInfo[chosen]?.weight;
      case "height":
        return pokemonInfo[chosen]?.height;
      case "type":
        return pokemonInfo[chosen]?.types[
          pokemonInfo[chosen]?.types.length - 1
        ]?.type?.name;
      default:
        return;
    }
  }

  useEffect(() => {
    switch (chosen) {
      case "alakazam":
        setPokemonImg(alakazam);
        break;
      case "blastoise":
        setPokemonImg(blastoise);
        break;
      case "bulbasaur":
        setPokemonImg(bulbasaur);
        break;
      case "charizard":
        setPokemonImg(charizard);
        break;
      case "flareon":
        setPokemonImg(flareon);
        break;
      case "gengar":
        setPokemonImg(gengar);
        break;
      case "haunter":
        setPokemonImg(haunter);
        break;
      case "pikachu":
        setPokemonImg(pikachu);
        break;
      case "vileplume":
        setPokemonImg(vileplume);
        break;
      default:
        alert("error");
    }
  }, [chosen]);

  useEffect(() => {
    setPokemonType(pokemonInfo[chosen]?.types[0]?.type?.name);
  }, [pokemonInfo[chosen]]);

  let habilityHiddenPokemon = pokemonInfo[chosen]?.abilities.find(
    element => element.is_hidden
  )?.ability?.name;

  let habilityHiddenPokemonUrl = pokemonInfo[chosen]?.abilities.find(
    element => element.is_hidden
  )?.ability.url;

  let hability = pokemonInfo[chosen]?.abilities?.find(
    element => !element.is_hidden
  )?.ability?.name;

  let habilityUrl = pokemonInfo[chosen]?.abilities?.find(
    element => !element.is_hidden
  )?.ability?.url;

  async function fetchInformationHability() {
    try {
      await fetch(habilityUrl)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setText(data.effect_entries[0].effect);
          setTitle(hability);
        });
    } catch (err) {
      setText("");
      setTitle("");
      console.log(err);
    }
  }

  async function fetchInformationHabilityHidden() {
    try {
      await fetch(habilityHiddenPokemonUrl)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setText(
            data.effect_changes[0]?.effect_entries[0]?.effect
              ? data.effect_changes[0]?.effect_entries[0]?.effect
              : data.effect_entries[0]?.effect
          );
          setTitle(habilityHiddenPokemon);
        });
    } catch (err) {
      setText("");
      setTitle("");
      console.log(err);
    }
  }

  return (
    <main>
      <div className="selectPokemon">
        <h1>Choose a Pokemon</h1>

        <SelectPokemon
          items={pokemons}
          onChange={event => setChosen(event.target.value)}
        />
  
      </div>

      <div className="container">
        <div className={`pokemonInfo ${type}`}>
          <img src={pokemonImg} alt="pokemon" />

          <section>
            <h3>{chosen}</h3>

            <div className="pokeType">{pokemonType}</div>

            <article className="info">
              <ul>
                <li>
                  <span>HP:</span> <span>{getType("hp")}</span>
                </li>
                <li>
                  <span>ATTACK:</span> <span>{getType("attack")}</span>
                </li>
                <li>
                  <span>DEFENSE:</span> <span>{getType("defense")}</span>
                </li>
                <li>
                  <span>SPECIAL ATTACK:</span>{" "}
                  <span>{getType("specialAttack")}</span>
                </li>
                <li>
                  <span>SPECIAL DEFENSE:</span>{" "}
                  <span>{getType("specialDefense")}</span>
                </li>
                <li>
                  <span>SPEED:</span> <span>{getType("speed")} m/s</span>
                </li>
                <li>
                  <span>HEIGHT:</span> <span>{getType("height")} feets</span>
                </li>
                <li>
                  <span>WEIGHT:</span> <span>{getType("weight")} pounds</span>
                </li>
              </ul>
            </article>

            <div className="pokeHability">
              <article onClick={fetchInformationHability}>
                <p>HABILITY</p>
                <p>{hability ? hability : "none"}</p>
              </article>

              <article onClick={fetchInformationHabilityHidden}>
                <p>HIDDEN HABILITY</p>
                <p>{habilityHiddenPokemon ? habilityHiddenPokemon : "none"}</p>
              </article>
            </div>
          </section>
        </div>

        <div className="container-text">
          <p>{title}</p>
          <p>{text}</p>
        </div>
      </div>
    </main>
  );
}

export default App;
