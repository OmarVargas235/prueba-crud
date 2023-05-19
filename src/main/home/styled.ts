import styled from "styled-components";

export const Container = styled.section`
    
`;

export const ContainerIconAction = styled.div`
    width: 40px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    &.edit {
        background-color: rgb(28, 30, 51);
    }

    &.delete {
        background-color: rgb(28, 30, 51);
    }
`;

export const ContainerCloseSession = styled.div`
    width: 150px;
    top: 110%;
    right: -40px;
    background-color: white;
    border-radius: 4px;
    -webkit-box-shadow: 1px 1px 49px -9px rgba(0,0,0,0.75);
    -moz-box-shadow: 1px 1px 49px -9px rgba(0,0,0,0.75);
    box-shadow: 1px 1px 49px -9px rgba(0,0,0,0.75);

    .text {
        transition: background-color .2s ease-in-out, color .2s ease-in-out;
        border-radius: 4px;

        &:hover {
            background-color: #EE3A57;
            color: white;
            cursor: pointer;
        }
    }
`;