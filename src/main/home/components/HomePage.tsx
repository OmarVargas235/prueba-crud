// 1.- librerias
import { useSelector } from "react-redux";

// 2.- components
import Badge from "../../../layauts/Badge";
import { Text } from "../../../layauts/Text";
import Table from "../../../layauts/table/Table";
import { Container, ContainerCloseSession } from "../styled";
import Avatar from "../../../layauts/Avatar";
import Modal from "../../../layauts/modal/Modal";
import Button from "../../../layauts/button/Button";
import CotainerIcon from "../../../layauts/cotainerIcon/CotainerIcon";

// 3.- utils
import { thead, tbody, optionsBadges } from "../utils";

// 4.- interfaces
import { OptionsBadge } from "../interface";
import { User } from '../../../helpers/interface';
import { RootState } from "../../../redux/reducers";

// 5.- icons
import { MdDelete } from "react-icons/md";

interface Props {
    badgeData: OptionsBadge;
    setBadgeData: (v: OptionsBadge) => void;
    isShow: boolean;
    setIsShow: (v: boolean) => void;
    closeSesion: () => void;
    users: User[];
    deleteUser: (v: string, isModal: boolean) => Promise<void>;
    isDelte: boolean;
    setIsDelete: (v: boolean) => void;
}

const HomePage = ({ badgeData, setBadgeData, isShow, setIsShow, closeSesion, users, deleteUser, isDelte, setIsDelete }: Props): JSX.Element => {

    const { name, lastName, _id } = useSelector<RootState, User>(state => state.user);

    return <Container className="p-5 w-100">
        <div className="w-100 d-flex justify-content-between position-relative">
            <Text
                weight="bold"
                size="16px"
                color="white"
            >Para deslogearse, click en el avatar {'------------------------------>'}</Text>

            <Avatar
                width="50px"
                height="50px"
                className="pointer"
                onClick={() => setIsShow(!isShow)}
                id="closeMenu"
            >{name.charAt(0).toUpperCase()}{lastName.charAt(0).toUpperCase()}</Avatar>

            {
                isShow ? <ContainerCloseSession className="position-absolute p-2 text-center">
                    <Text
                        className="text closeMenu"
                        onClick={closeSesion}
                    >Cerrar sesión</Text>
                </ContainerCloseSession>
                : null
            }
        </div>

        <Text
            size="30px"
            weight="bold"
            color="white"
            className="mb-4"
        >Lista de usuarios</Text>

        <div className="mb-3">
            <Badge
                elements={optionsBadges}
                setBadgeData={setBadgeData}
            />
        </div>

        <Table
            thead={thead}
            tbody={tbody(users, ()=>{}, deleteUser, _id)}
            width='180px'
            refresh={()=> window.location.reload()}
            addUser={()=>{}}
            isNewUser={true}
        />

        <Modal
            closeModal={(v) => setIsDelete(v)}
            open={isDelte}
            textBtn=''
            isButton={false}
            classess='modal-delete'
            width='300px'
        >
            <CotainerIcon
                icon={<MdDelete size={30} />}
                isCheck={false}
            />
            
            <Text className="text-center mb-3">Estas seguro de eliminar este producto?</Text>

            <div className='d-flex justify-content-center'>
                <Button
                    classes='mr-2'
                    color='#1e7e34'
                    handleClick={() => {void deleteUser('code', false)}}
                >Aceptar</Button>
                
                <Button color='#dc3545' dataClose='close'>Rechazar</Button>
            </div>
        </Modal>
    </Container>;
}

export default HomePage;