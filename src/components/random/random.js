import React, { useState } from "react";
import { Container, PokeImage } from "./styled";
import axios from "axios";
import { Types } from "../types/types";

export const Random = () => {
  const [pokemonimg, setPokemonImg] = useState(null); // 초기에는 null로 설정
  const [pokemonName, setPokemonName] = useState(null); // 초기에는 null로 설정
  const [pokemonflavor, setPokemonflavor] = useState(null);
  const [pokemongenera, setPokemongenera] = useState(null);
  const [pokemonTypes, setPokemonTypes] = useState([]);

  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1205) + 1;
  };

  //API 요청값 확인

  //포켓몬 데이터 가져오기
  const getPokemonData = async (number) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-form/${number}`
      );
      const species_response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${number}`
      );
      setPokemonImg(response.data.sprites.front_default);
      setPokemonName(
        species_response.data.names.find((name) => name.language.name === "ko")
          .name
      );
      setPokemonflavor(
        species_response.data.flavor_text_entries.find(
          (name) => name.language.name === "ko"
        ).flavor_text
      );
      setPokemongenera(
        species_response.data.genera.find((name) => name.language.name === "ko")
          .genus
      );
      setPokemonTypes(response.data.types);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <div
        onClick={() => {
          const randomNumber = generateRandomNumber();
          getPokemonData(randomNumber);
        }}
      >
        뽑기 버튼
      </div>
      {pokemonimg && <PokeImage src={pokemonimg} alt="" />}
      {pokemonName && <div>이름 : {pokemonName}</div>}
      {pokemonflavor && <div>{pokemonflavor}</div>}
      {pokemonTypes.map((e, i) => {
        return <Types key={i} props={e.type.url} />;
      })}
    </Container>
  );
};
