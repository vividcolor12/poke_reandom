/** @format */

import React from "react";
import { Container } from "./styled";
import Card from "../card/card";

export const Main = () => {
    return (
        <>
            <Container>
                <h3>Main 페이지</h3>
                <div>
                    <Card title="포켓몬 랜덤 뽑기" linkTo="/random" />
                    <Card title="자랑하기" linkTo="/comment" />
                </div>
            </Container>
        </>
    );
};
