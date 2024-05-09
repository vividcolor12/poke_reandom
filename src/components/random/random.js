import React, { useState } from "react";
import { Container, PokeImage } from "./styled";
import axios from "axios";

export const Random = () => {
  const [pokemonimg, setPokemonImg] = useState(null); // 초기에는 null로 설정
  const [pokemonName, setPokemonName] = useState(null); // 초기에는 null로 설정

  //랜덤번호 생성
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1205) + 1;
  };

  //API 요청값 확인

  //포켓몬 이미지 가져오기
  const getPokemonImg = async (number) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${number}`
      );

      setPokemonImg(response.data.sprites.front_default);
    } catch (e) {
      console.log(e);
    }
  };

  const getPokemonName = async (number) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${number}`
      );

      setPokemonName(response.data.forms[0].name);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container>
      <div
        onClick={() => {
          const randomNumber = generateRandomNumber();
          getPokemonImg(randomNumber);
          getPokemonName(randomNumber);
        }}
      >
        api Button
      </div>
      {pokemonimg && <PokeImage src={pokemonimg} alt="" />}
      {pokemonName && <div>Name : {pokemonName}</div>}
    </Container>
  );
};
