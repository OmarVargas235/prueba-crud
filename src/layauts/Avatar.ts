import styled from "styled-components";

interface Props {
    color?: string;
    colorLetter?: string;
    width?: string;
    height?: string;
}

const Avatar = styled.div<Props>`
    width: ${props => props.width ?? '50px'};
    height: ${props => props.height ?? '50px'};
    background-color: ${props => props.color ?? '#BDBDBD'};
    color: ${props => props.colorLetter ?? 'white'};
    border-radius: 50%;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default Avatar;