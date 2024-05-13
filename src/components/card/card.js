// Card.js
import React from "react";
import { Container } from "./styled";
import { Link } from "react-router-dom";

const Card = ({ title, linkTo }) => {
    return (
        <Link to={linkTo}>
            <Container>
                <h2>{title}</h2>
            </Container>
        </Link>
    );
};

export default Card;
