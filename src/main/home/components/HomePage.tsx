// 1.- librerias

// 2.- components
import Badge from "../../../layauts/Badge";
import { Text } from "../../../layauts/Text";
import Table from "../../../layauts/table/Table";
import { Container } from "../styled";
import Avatar from "../../../layauts/Avatar";

// 3.- utils
import { thead, tbody, optionsBadges } from "../utils";

// 4.- interfaces
import { OptionsBadge } from "../interface";

interface Props {
    badgeData: OptionsBadge;
    setBadgeData: (v: OptionsBadge) => void;
}

const HomePage = ({ badgeData, setBadgeData }: Props): JSX.Element => {
    
    return <Container className="p-5 w-100">
        <div className="w-100 d-flex justify-content-end">
            <Avatar
                width="50px"
                height="50px"
            >OV</Avatar>
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