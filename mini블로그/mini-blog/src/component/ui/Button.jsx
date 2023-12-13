import React from "react";
import styled from "styled-components";
const StyledButton = styled.button`
    padding: 8px 16px;
    font-size: 16px;
    border-width: 1px;
    border-radius: 8px;
    cursor: pointer;
`;

function Button(props) {
    const { title, onclick } = props;

    return <StyledButton onClick={onclick}>{title || "button"} </StyledButton>;
}

export default Button;
