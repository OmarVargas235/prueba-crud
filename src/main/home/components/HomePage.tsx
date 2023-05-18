// 1.- librerias

// 2.- components
import Badge from "../../../layauts/Badge";
import { Text } from "../../../layauts/Text";
import Table from "../../../layauts/table/Table";
import { Container, ContainerCloseSession } from "../styled";
import Avatar from "../../../layauts/Avatar";

// 3.- utils
import { thead, tbody, optionsBadges } from "../utils";

// 4.- interfaces
import { OptionsBadge } from "../interface";

interface Props {
    badgeData: OptionsBadge;
    setBadgeData: (v: OptionsBadge) => void;
    isShow: boolean;
    setIsShow: (v: boolean) => void;
    closeSesion: () => void;
}

const HomePage = ({ badgeData, setBadgeData, isShow, setIsShow, closeSesion }: Props): JSX.Element => {
    
    return <Container className="p-5 w-100">
        <div className="w-100 d-flex justify-content-end position-relative">
            <Avatar
                width="50px"
                height="50px"
                className="pointer"
                onClick={() => setIsShow(!isShow)}
                id="closeMenu"
            >OV</Avatar>

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
            tbody={tbody([], ()=>{}, ()=>{})}
            width='180px'
            refresh={()=> window.location.reload()}
            addUser={()=>{}}
            isNewUser={true}
        />
    </Container>;
}

export default HomePage;