/** @format */

import React, { useState } from "react";
import { Container, PokeImage } from "./styled"; // styled-components에서 Container와 PokeImage를 가져옴
import axios from "axios"; // axios 모듈을 가져옴

export const Random = () => {
    // Random 컴포넌트 정의
    // useState를 사용하여 상태를 관리
    const [pokemonimg, setPokemonImg] = useState(null); // 포켓몬 이미지 URL을 저장하는 상태 변수
    const [pokemonName, setPokemonName] = useState(null); // 포켓몬 이름을 저장하는 상태 변수
    const [pokemonflavor, setPokemonflavor] = useState(null); // 포켓몬의 맛 설명을 저장하는 상태 변수
    const [pokemongenera, setPokemongenera] = useState(null); // 포켓몬의 분류를 저장하는 상태 변수
    const [pokemonTypes, setPokemonTypes] = useState([]); // 포켓몬의 타입을 저장하는 배열 상태 변수
    const [pokemonId, setPokemonId] = useState(null); // 포켓몬의 도감번호를 저장하는 상태 변수

    // 랜덤한 숫자를 생성하는 함수
    const generateRandomNumber = () => {
        return Math.floor(Math.random() * 1205) + 1;
    };

    // API 요청을 보내어 포켓몬 데이터를 가져오는 함수
    const getPokemonData = async (number) => {
        try {
            // 포켓몬 정보에 대한 API 요청을 보냄
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-form/${number}`);
            // 포켓몬 종에 대한 API 요청을 보냄
            const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${number}`);

            // 가져온 데이터를 상태에 반영
            setPokemonId(number); // 도감번호 설정
            setPokemonImg(response.data.sprites.front_default); // 이미지 설정
            // 한국어 이름 설정
            setPokemonName(speciesResponse.data.names.find((name) => name.language.name === "ko").name);
            // 한국어 맛 설명 설정
            setPokemonflavor(
                speciesResponse.data.flavor_text_entries.find((name) => name.language.name === "ko").flavor_text
            );
            // 한국어로 포켓몬 분류 설정
            setPokemongenera(speciesResponse.data.genera.find((name) => name.language.name === "ko").genus);

            // 각 타입의 한글 이름을 가져오는 비동기 처리
            const typesPromises = response.data.types.map(async (typeData) => {
                const typeResponse = await axios.get(typeData.type.url);
                const koreanTypeName = typeResponse.data.names.find((name) => name.language.name === "ko").name;
                return koreanTypeName;
            });
            // 모든 타입 이름을 가져온 후에 상태에 반영
            const koreanTypeNames = await Promise.all(typesPromises);
            const concatenatedNames = koreanTypeNames.join(","); // 각 타입 이름을 쉼표와 공백으로 구분된 문자열로 결합
            setPokemonTypes(concatenatedNames); // 타입 설정
            // 데이터 저장
            const pokeDateSave = {
                img: response.data.sprites.front_default,
                id: number,
                name: speciesResponse.data.names.find((name) => name.language.name === "ko").name,
            };
            localStorage.setItem("pokeDate", JSON.stringify(pokeDateSave));
        } catch (e) {
            // 오류가 발생하면 콘솔에 오류를 기록
            console.log(e);
        }
    };

    // JSX 반환
    return (
        <Container>
            {/* 클릭 시 랜덤한 포켓몬 데이터를 가져오는 버튼 */}
            <div
                onClick={() => {
                    const randomNumber = generateRandomNumber();
                    getPokemonData(randomNumber);
                }}
            >
                뽑기 버튼
            </div>
            {/* 포켓몬 이미지 출력 */}
            {pokemonimg && <PokeImage src={pokemonimg} alt="" />}
            {/* 포켓몬 도감번호 출력 */}
            {pokemonId && <div>도감번호 : {pokemonId}</div>}
            {/* 포켓몬 이름 출력 */}
            {pokemonName && <div>이름 : {pokemonName}</div>}
            {/* 포켓몬 타입 출력, types 배열의 길이가 0이면 타입 글자가 안보이게 함.*/}
            {pokemonTypes && pokemonTypes.length > 0 && <div>타입 : {pokemonTypes}</div>}
            {/* 포켓몬 분류 출력 */}
            {pokemongenera && <div>분류 : {pokemongenera}</div>}
            {/* 포켓몬 맛 설명 출력 */}
            {pokemonflavor && <div>{pokemonflavor}</div>}
        </Container>
    );
};

export default Random; // Random 컴포넌트를 외부에서 사용할 수 있도록 내보냄
