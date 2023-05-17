
// 2.- components
import FadeImage from "../../../layauts/fadeImage/FadeImage";
import { Text } from "../../../layauts/Text";
import { Header } from "../styled";

// 3.- imagenes
import imgLogo from '../../../assets/img/logo.png';
import imgLoading from '../../../assets/img/no-image.jpg';

const HeaderPage = (): JSX.Element => {

    return <Header>
        <FadeImage
            placeholder={imgLoading}
            img={imgLogo}
            alt="imgLogo"
            className="img"
            height="170px"
        />

        <div className="w-100 text-center">
            <Text
                size="35px"
                weight="bold"
            >Bienbenido</Text>

            <Text
                size="18px"
            >A las mejores pizzas del pais</Text>
        </div>
    </Header>;
}

export default HeaderPage;