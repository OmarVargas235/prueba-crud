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
        background-color: ${props => props.theme.actions.edit};
    }

    &.delete {
        background-color: ${props => props.theme.actions.delete};
    }
`;