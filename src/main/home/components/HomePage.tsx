// 1.- librerias
import { ChangeEvent } from "react";

// 2.- componets
import TextField from "../../../layauts/textField/TextField";
import { Text } from "../../../layauts/Text";
import Header from "../container/Header";
import { Container, ListView } from '../styled';
import CardPage from "./CardPage";

// 3.- iconos
import { BiSearchAlt2 } from "react-icons/bi";

// 4.- interface
import { Store } from "../../../helpers/interface";

interface Props {
    stores: Store[];
    search: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const HomePage = ({ stores, search, handleChange }: Props): JSX.Element => {
    
    return <Container className="px-4 w-100">
        <Header />

        <div className="border-bottom text-center w-25 mb-2 mb-sm-4">
            <Text>Pizzerías</Text>
        </div>

        <Text
            size="30px"
            weight="bold"
        >Tiendas</Text>

        <Text className="mt-2 mb-3" color="#827E81">Escoje tu pizzería favorita</Text>

        <TextField
            name="pizzeira"
            handleChange={handleChange}
            value={search}
            classes="w-100 w-sm-75 mb-4 mb-sm-5"
            placeholder="Buscar una pizzeíra"
            icon2={<BiSearchAlt2 size={25} color='#2F2C2D' className="mr-3" />}
            edge2="end"
        />

        <ListView className="row">
            {
                stores.map(v => (
                    <CardPage
                        key={v.id}
                        data={v}
                    />
                ))
            }
        </ListView>
    </Container>;
}

export default HomePage;