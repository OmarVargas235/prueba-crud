// 1.- librerias
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// 2.- components
import { Container } from '../styled';
import Form from "../../../layauts/form/Form";
import TextField from "../../../layauts/textField/TextField";
import { Text } from "../../../layauts/Text";
import Button from "../../../layauts/button/Button";
import Checkbox from "../../../layauts/checkbox/Checkbox";

// 4.- interfaces
import { HandleSubmit, HandleChange } from "../../../hooks/hookForm/interface";
import { Model, RequeridFields } from "../container/Login";

// 5.- iconos
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

interface Props {
    handleSubmit: HandleSubmit<Model>;
    handleChange: HandleChange<Model>;
    onSubmit: (v: object) => Promise<void>;
    form: Model;
    setForm: (v: Model) => void;
    errors: RequeridFields[];
    isShowPassword: boolean;
    setIsShowPassword: (v: boolean) => void;
    rememberPassword: (e: ChangeEvent<HTMLInputElement>) => void;
    isChecked: boolean;
}

const LoginPage = ({ handleChange, handleSubmit, onSubmit, form, setForm, errors, isShowPassword,setIsShowPassword, rememberPassword, isChecked  }: Props): JSX.Element => {

    const history = useNavigate();

    return <Container>        
        <Form
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            className="form p-5"
        >
            <Text
                size='24px'
                className='mb-4 text-center'
                weight='600'
                color='white'
            >Iniciar sesion</Text>

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
                placeholder="Email"
            />

            <TextField
                type={isShowPassword ? "password" : "text"}
                name="password"
                handleChange={e => handleChange(e, setForm, form)}
                isError={errors.includes('password')}
                helperText={errors.includes('password') ? "password requerido" : ''}
                colorHelperText="#D32F2F"
                value={form.password}
                placeholder="Contraseña"
                icon={
                    isShowPassword
                    ? <IoEyeSharp
                        size={25}
                        color='white'
                        onClick={() => setIsShowPassword(false)}
                    />
                    : <IoEyeOffSharp
                        size={25}
                        color='white'
                        onClick={() => setIsShowPassword(true)}
                    />
                }
                edge="end"
            />

            <Checkbox
                id='id'
                name='name'
                value='value'
                handleChange={rememberPassword}
                isChecked={isChecked}
            >Recordar</Checkbox>

            <div className="w-100 d-flex justify-content-center mt-4">
                <Button
                    type="submit"
                    fullWidth={true}
                    classes="btn"
                >Iniciar Sesión</Button>
            </div>

            <Text
                size="16px"
                weight="bold"
                className="mt-4 mb-2 pointer text-center"
                color='#EE3A57'
                onClick={() => history('/register-admin')}
            >Crear Cuenta Administrador</Text>
        </Form>
    </Container>;
}

export default LoginPage;