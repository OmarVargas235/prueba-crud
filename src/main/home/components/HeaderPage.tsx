// 1.- librerias
import { useSelector } from 'react-redux';

// 2.- componets
import Avatar from "../../../layauts/Avatar";
import { ContainerImgProfile, Header } from "../styled";
import FadeImage from '../../../layauts/fadeImage/FadeImage';

// 3.- redux
import { IInitState } from '../../../redux/reducers/reducerUser';
import { RootState } from '../../../redux/store';

// 3.- imagenes
import imgLoading from '../../../assets/img/no-image.jpg';

interface Props {
    handleClick: () => void;
}

const HeaderPage = ({ handleClick }: Props): JSX.Element => {

    const { user } = useSelector<RootState, IInitState>(state => state.user);
    
    return <Header className="w-100 d-flex justify-content-end mb-5">
        {
            user.img !== null
            ? <ContainerImgProfile onClick={handleClick}>
                <FadeImage
                    placeholder={imgLoading}
                    img={user.img}
                    alt="imgPizza"
                    classNameContainer="pointer"
                />
            </ContainerImgProfile>
            : <Avatar
                className="pointer"
                onClick={handleClick}
            >{user.name.charAt(0).toUpperCase()}{user.lastName.charAt(0).toUpperCase()}</Avatar>
        }
    </Header>;
}

export default HeaderPage;