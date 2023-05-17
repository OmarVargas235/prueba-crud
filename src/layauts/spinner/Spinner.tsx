// 1.- Librerias
import { useSelector } from 'react-redux';

// 2.- Components
import { Container } from './styled';

// 3.- redux
import { RootState } from '../../redux/store';
import { IInitState } from '../../redux/reducers/reducerBlockUI';

interface Props {
    isLoading?: boolean;
}

const Spinner = ({ isLoading=false }: Props): JSX.Element => {

    const { isActive } = useSelector<RootState, IInitState>(state => state.blockUI);

    return <>
        {
            ( isLoading || Boolean(isActive) )
            ? <Container
                className='position-fixed w-100 min-h-100 d-flex justify-content-center align-items-center'
            >
                <div className="ml-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </Container> : null
        }
    </>;
}

export default Spinner;