// 1.- librerias
import { useNavigate } from 'react-router-dom';

// 2.- components
import HeaderPage from './HeaderPage';
import Form from "../../../layauts/form/Form";
import TextField from "../../../layauts/textField/TextField";
import { Text } from "../../../layauts/Text";
import Button from "../../../layauts/button/Button";

// 4.- interfaces
import { HandleSubmit, HandleChange } from "../../../hooks/hookForm/interface";
import { Model, RequeridFields } from "../container/Login";

// 5.- iconos
import { FaUserAlt } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";

interface Props {
    handleSubmit: HandleSubmit<Model>;
    handleChange: HandleChange<Model>;
    onSubmit: (v: object) => Promise<void>;
    form: Model;
    setForm: (v: Model) => void;
    errors: RequeridFields[];
}

const LoginPage = ({ handleChange, handleSubmit, onSubmit, form, setForm, errors }: Props): JSX.Element => {

    const history = useNavigate();

    return <>
        <HeaderPage />
        
        <Form
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            className="w-75 w-sm-100 w-md-75 w-lg-50"
        >
            <TextField
                type="email"
                name="email"
                handleChange={e => handleChange(e, setForm, form)}
                isError={errors.includes('email')}
                helperText={errors.includes('email') ? "email requerido" : ''}
                colorHelperText="#D32F2F"
                value={form.email}
                classes="my-3"
                isFull={true}
                placeholder="Usuario (email)"
                icon={<FaUserAlt size={20} color='#020101' />}
                edge="end"
            />

            <TextField
                type="password"
                name="password"
                handleChange={e => handleChange(e, setForm, form)}
                isError={errors.includes('password')}
                helperText={errors.includes('password') ? "password requerido" : ''}
                colorHelperText="#D32F2F"
                value={form.password}
                placeholder="Contraseña"
                icon={<AiFillLock size={20} color='#020101' />}
                edge="end"
            />

            <div className="w-100 text-center mt-4">
                <Text
                    size="17px"
                    weight="bold"
                    className="mb-2 pointer"
                    color="#3F3E46"
                    onClick={() => history('/register')}
                >Crear Cuenta</Text>

                <Text
                    size="17px"
                    weight="bold"
                    className="pointer"
                    color='#3F3E46'
                    onClick={() => history('/reset-password')}
                >¿Olvidaste tu contraseña?</Text>
            </div>

            <div className="w-100 d-flex justify-content-center mt-4">
                <Button
                    type="submit"
                    fullWidth={true}
                    classes="btn"
                >Iniciar  Sesión</Button>
            </div>
        </Form>
    </>;
}

export default LoginPage;