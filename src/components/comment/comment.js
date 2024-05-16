import React, { useEffect, useState } from "react";
import { Container } from "./styled";

export const Comment = () => {
    const [pokemonDataCollection, setPokemonDataCollection] = useState([]);

    useEffect(() => {
        const storedPokemonData = JSON.parse(localStorage.getItem("pokeDataCollection")) || [];
        setPokemonDataCollection(storedPokemonData);
    }, []);

    return (
        <Container>
            {pokemonDataCollection.length > 0 ? (
                pokemonDataCollection.map((pokemon, index) => (
                    <div key={index}>
                        <img src={pokemon.img} alt={pokemon.name} />
                        <div>도감번호: {pokemon.id}</div>
                        <div>이름: {pokemon.name}</div>
                    </div>
                ))
            ) : (
                <div>저장된 포켓몬이 없습니다.</div>
            )}
        </Container>
    );
};
