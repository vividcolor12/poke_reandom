/** @format */

import React from "react";
import { Container, Card } from "./styled";
import { useNavigate } from "react-router-dom";

export const Main = () => {
    const navigate = useNavigate();
    return (
        <>
            <Container>
                <h3>Main 페이지</h3>
                <div>
                    <Card onClick={() => navigate("/random")}>포켓몬 뽑기</Card>
                    <Card onClick={() => navigate("/comment")}>자랑하기</Card>
                </div>
            </Container>
        </>
    );
};
