import { ContainerIcons } from './styled';

import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";

interface IProps {
    icon: JSX.Element;
    isCheck?: boolean;
}

const CotainerIcon = ({ icon, isCheck=false }: IProps): JSX.Element => (
    <div className='d-flex justify-content-center'>
        <ContainerIcons
                className='position-relative d-flex justify-content-center align-items-center mb-4'
        >
            { icon }

            {
                isCheck ? <AiFillCheckCircle
                    size={45}
                    color='#3FA96B'
                    className='position-absolute closeCircle'
                /> : <AiFillCloseCircle
                    size={45}
                    color='#EB5757'
                    className='position-absolute closeCircle'
                />
            }
        </ContainerIcons>
    </div>
);

export default CotainerIcon;