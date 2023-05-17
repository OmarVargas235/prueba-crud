// 1. librerias
import { MouseEvent, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// 2.- estilos
import { Container, ContainerModal, Body } from './styled';

// 3.- iconos
import { BiXCircle } from "react-icons/bi";
import { AiFillCloseCircle, AiFillCheckCircle, AiFillWarning } from "react-icons/ai";

// 4.- components
import Button from '../button/Button';
import { Text } from '../Text';
import Animation, { timeClose } from '../animation/Animation';

// 5.- services
import { auth } from '../../services/auth';

// 6.- interfaces
import { RootState } from '../../redux/store';

// 7.- redux
import { setIsActiveAlert, IInitState } from '../../redux/reducers/reducerAlert';

// 8.- context
import { AuthContext } from '../../auth/AuthProvider';

let timeout: string | number | NodeJS.Timeout | undefined;

const expireSesion = 'Lo sentimos, la sesión ha expirado';

const Alert = (): JSX.Element => {

    const dispath = useDispatch();

    const { setIsAuth } = useContext(AuthContext);

    const { isActive, messageAlert, isAlertSuccess, isAlertWarning } = useSelector<RootState, IInitState>(state => state.alert);

    const [isClose, setIsclose] = useState(false);

    const close = (): void => {

        clearTimeout(timeout);

        window.setTimeout(() => {

            setIsclose(false);
            dispath(setIsActiveAlert(false));

        }, timeClose);

        setIsclose(true);
    }

    const closeDiv = (e: MouseEvent<HTMLDivElement>): void => {
        
        const target: HTMLDivElement = e.target as HTMLDivElement;
        target.dataset.close === 'close' && close();

        messageAlert === expireSesion && auth.logout();
        messageAlert === expireSesion && setIsAuth(false);
    }

    return <>
        {
            isActive ? <Container
                className='d-flex justify-content-center align-items-center'
                onClick={closeDiv}
                data-close="close"
            >
                <Animation isClose={isClose}>
                    <ContainerModal>
                        <div className='d-flex justify-content-end mb-4'>
                            <BiXCircle
                                onClick={close}
                                size={25}
                                className="pointer"
                            />
                        </div>

                        <Body className='d-flex flex-column align-items-center justify-content-center'>
                            {
                                isAlertSuccess ? <AiFillCheckCircle
                                    size={45}
                                    color='#3FA96B'
                                />
                                : messageAlert === expireSesion || isAlertWarning
                                    ? <AiFillWarning
                                        size={45}
                                        color='#ffc107'
                                    />
                                    : <AiFillCloseCircle
                                        size={45}
                                        color='#EB5757'
                                    />
                            }

                            <Text className='my-4 text-center' color='#303030' size='18px'>{messageAlert}</Text>

                            <Button
                                dataClose="close"
                            >Entendido</Button>
                        </Body>
                    </ContainerModal>
                </Animation>
            </Container> : null
        }
    </>
}

export default Alert;