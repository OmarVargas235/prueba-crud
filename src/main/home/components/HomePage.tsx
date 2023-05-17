// 1.- librerias

// 2.- components
import { Text } from "../../../layauts/Text";
import Table from "../../../layauts/table/Table";
import { Container } from "../styled";

// 3.- utils
import { thead, tbody } from "../utils";

const HomePage = (): JSX.Element => {
    
    return <Container className="p-5 w-100">
        <Text
            size="30px"
            weight="bold"
            color="white"
            className="mb-4"
        >Lista de usuarios</Text>

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