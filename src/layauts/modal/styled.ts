import styled from 'styled-components';

interface IContainerModal {
    height: number;
    isScrollY: boolean;
    width: string;
}

export const Container = styled.section`
    background-color: rgba(0, 0, 0, .6);
    min-height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
`;

export const ContainerModal = styled.div<IContainerModal>`
    border-radius: 3px;
    width: ${props => props.width};
    background-color: ${props => props.theme.bg.bg3};
    padding: 20px;
    border-radius: 5px;

    ${({ height, isScrollY }) => {
        return isScrollY ? (`
            height: ${height}px;
            overflow-y: scroll;
        `) : '';
    }}
`;

export const Body = styled.div`

`;