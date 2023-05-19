// 1.- librerias
import { useSelector, useDispatch } from "react-redux";

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

// 6.- redux
import { setOpenModalUser } from '../../../redux/reducers/openModalUser';

// 7.- hooks
import { useMediaQuery } from '../../../hooks/useMediaQuery';

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
    edit: (v: User) => void;
}

const HomePage = ({ badgeData, setBadgeData, isShow, setIsShow, closeSesion, users, deleteUser, isDelte, setIsDelete, edit }: Props): JSX.Element => {

    const { name, lastName, _id, role } = useSelector<RootState, User>(state => state.user);

    const dispatch = useDispatch();

    const matches = useMediaQuery('(max-width: 632px)');

    return <Container className="p-5 w-100">
        <div className={`w-100 d-flex ${matches ? 'justify-content-end' : 'justify-content-between'} position-relative`}>
            {
                matches ? null
                : <Text
                    weight="bold"
                    size="16px"
                    color="white"
                >Para cerrar sesión, click en el avatar {'------------------------------>'}</Text>
            }

            <Avatar
                width="50px"
                height="50px"
                className="pointer"
                onClick={() => setIsShow(!isShow)}
                id="closeMenu"
            >
                <span
                    className="mr-1"
                    onClick={() => setIsShow(!isShow)}
                    id="closeMenu"
                >{name.charAt(0).toUpperCase()}</span>

                <span
                    onClick={() => setIsShow(!isShow)}
                    id="closeMenu"
                >{lastName.charAt(0).toUpperCase()}</span>
            </Avatar>

            {
                isShow ? <ContainerCloseSession className="position-absolute p-2 text-center">
                    <Text className="text closeMenu">{name} {lastName}</Text>
                    <Text className="text closeMenu">{role}</Text>

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
            tbody={tbody(users, edit, deleteUser, _id, role, badgeData.id === 2)}
            width='180px'
            refresh={()=> window.location.reload()}
            addUser={()=>  dispatch(setOpenModalUser({ isActive: true, type: 'CREATE' })) }
            isNewUser={role === 'ADMIN'}
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
            
            <Text
                className="text-center mb-3"
                color="white"
            >Estas seguro de eliminar este producto?</Text>

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