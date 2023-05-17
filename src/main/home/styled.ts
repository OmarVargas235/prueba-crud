import styled from "styled-components";
import { mediaQueryListView } from "../../helpers/utils";

export const Container = styled.section`
    
    .border-bottom {
        border-bottom: 3px solid #FCB232 !important;
    }

    &.mb-5 {
        margin-bottom: 5rem !important;
    }

    @media (max-width: 576px) {
        .col-10 {
            -webkit-box-flex: 0 !important;
            -ms-flex: 0 0 50% !important;
            flex: 0 0 50% !important;
            max-width: 50% !important;
        }
    }

    @media (max-width: 400px) {
        .col-10 {
            -webkit-box-flex: 0 !important;
            -ms-flex: 0 0 100% !important;
            flex: 0 0 100% !important;
            max-width: 100% !important;
        }
    }
`;

export const Header = styled.div`
    &.mb-5 {
        margin-bottom: 4rem !important;

        @media (max-width: 576px) {
            margin-bottom: .1rem !important;
        }
    }
`;

export const ListView = styled.div`
    height: 220px;
    overflow-y: auto;
    bottom: 0;

    ${mediaQueryListView()};
`;

export const Card = styled.div`

`;

export const ContainerImg = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 4px;
    overflow: hidden;
`;

export const ContainerImgProfile = styled.div`
    width: 50px;
    height: 50px;
    border: 2px solid ${props => props.theme.border};
    border-radius: 50%;
    overflow: hidden;
`;

export const FooterCard = styled.div`
    width: 150px;
`;