// 1.- librerias
import { useNavigate } from 'react-router-dom';

// 2.- componets
import FadeImage from '../../../layauts/fadeImage/FadeImage';
import { Text } from '../../../layauts/Text';
import { Card, ContainerImg, FooterCard } from '../styled';

// 3.- imagenes
import imgLoading from '../../../assets/img/no-image.jpg';

// 4.- interface
import { Store } from "../../../helpers/interface";

interface Props {
    data: Store;
}

const VITE_BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;

const CardPage = ({ data }: Props): JSX.Element => {

    const history = useNavigate();
    
    return <Card
        className='col-10 col-md-6 col-xl-4 pl-0 mb-4 pointer'
        onClick={() => history(`/detail/${data.id}`)}
    >
        <ContainerImg>
            <FadeImage
                placeholder={imgLoading}
                img={`${VITE_BACKEND_URL ?? ''}/${data.logo}`}
                alt="imgPizza"
                className=""
            />
        </ContainerImg>

        <FooterCard className='text-center'>
            <Text
                color='#827E81'
                weight='600'
            >{data.title}</Text>

            <Text
                size='15px'
            >{data.direction}</Text>
        </FooterCard>
    </Card>;
}

export default CardPage;