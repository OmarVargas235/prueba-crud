// 1.- librerias
import { useDispatch } from 'react-redux';

// 2.- componets
import HeaderPage from '../components/HeaderPage';

// 3.- redux
import { setActiveNavbar } from '../../../redux/reducers/reducerOpenNavbar';

const Header = (): JSX.Element => {

    const dispatch = useDispatch();

    const handleClick = (): void => {dispatch(setActiveNavbar());}

    return <HeaderPage
        handleClick={handleClick}
    />;
}

export default Header;