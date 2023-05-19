import styled from 'styled-components';

interface IThead {
    color?: string;
    size?: string;
    weight?: string;
    columns: number;
    align: 'left' | 'center' | 'right';
    widthGrid: string;
    bgColor?: string;
}

interface ITh {
    bgColor?: string;
    isFirst: boolean;
    isLast: boolean;
}

interface ITr {
    size?: string;
    columns: number;
    align: 'left' | 'center' | 'right';
    widthGrid: string;
}

export const Container = styled.section`
    border: 1px solid #BABCCB;
    border-radius: 10px;

    .container-header {
        @media (max-width: 426px) {
            flex-direction: column;
        }
    }

    .border-radius {
        border-radius: 20px;
        
        @media (max-width: 574px) {
            width: 150px !important;
        }

        @media (max-width: 500px) {
            width: 100px !important;
        }

        @media (max-width: 426px) {
            width: 100% !important;
        }
    }

    .container-footer {
        @media (max-width: 435px) {
            flex-direction: column;
            align-items: center !important;
        }
    }

    .container-table {
        overflow-x: scroll;
    }

    .btn-table {
        width: 25px;
        padding: 2px 5px !important;
        
        span {
            font-size: 12px;
        }
    }

    .container-buttons {
        button {
            @media (max-width: 660px) {
                font-size: 10px;
                padding: 3px;
            }

        }

        @media (max-width: 426px) {
            margin-top: 10px;
        }
    }
`;

export const Thead = styled.article<IThead>`
    color: ${props => props.color ?? '#22285A'};
    font-size: ${props => props.size ?? '16px'};
    font-weight: ${props => props.weight ?? 'bold'};
    background-color: ${props => props.bgColor ?? '#F3F6F9'};
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;

    display: grid;
    grid-template-columns: ${props => `repeat(${props.columns}, ${props.widthGrid})`};
    text-align: ${props => props.align};
`;

export const TBody = styled.article`
    background-color: rgb(238, 58, 87);
    color: white;
`;

export const Tr = styled.div<ITr>`
    font-size: ${props => props.size ?? '16px'};
    text-align: ${props => props.align};
    display: grid;
    grid-template-columns: ${props => `repeat(${props.columns}, ${props.widthGrid})`};
`;

export const Th = styled.div<ITh>`
    background-color: ${props => props.bgColor ?? '#F3F6F9'};

    ${props => props.isFirst ? `border-top-left-radius: 5px;` : ''};
    ${props => props.isLast ? `border-top-right-radius: 5px;` : ''};
`;

export const Td = styled.div`
    background-color: #EE3A57;
`;

export const BoxNumberPaginate = styled.div<{ isCurrent: boolean; }>`
    border-radius: 3px;
    cursor: pointer;
    width: 25px;
    padding: 2px 5px;
    font-size: 12px;
    text-align: center;
    margin: 0 1px;
    transition: .2s ease-in-out color, .2s ease-in-out background-color;

    ${
        props => props.isCurrent
        ? `
            color: white;
            background-color: #EE3A57;
        ` : `
            background-color: transparent;
            color: white;
        `
    }

    &:hover {
        color: white;
        background-color: #EE3A57;
    }
`;