// 1.- librerias
import { useNavigate } from 'react-router-dom';

// 2.- components
import { Container } from '../styled';
import Form from "../../../layauts/form/Form";
import TextField from "../../../layauts/textField/TextField";
import { Text } from "../../../layauts/Text";
import Button from "../../../layauts/button/Button";

// 4.- interfaces
import { HandleSubmit, HandleChange } from "../../../hooks/hookForm/interface";
import { Model, RequeridFields } from "../container/RegisterAdmin";

// 5.- iconos
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

interface Props {
    handleSubmit: HandleSubmit<Model>;
    handleChange: HandleChange<Model>;
    onSubmit: (v: object) => Promise<void>;
    form: Model;
    setForm: (v: Model) => void;
    errors: RequeridFields[];
    isShowPassword: {isShow1: boolean; isShow2: boolean};
    setIsShowPassword: (v: {isShow1: boolean; isShow2: boolean}) => void;
}

const RegisterAdminPage = ({ handleChange, handleSubmit, onSubmit, form, setForm, errors, isShowPassword, setIsShowPassword }: Props): JSX.Element => {

    const history = useNavigate();

    return <Container className='py-5'>        
        <Form
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            className="form p-5"
        >
            <Text
                size='24px'
                className='mb-4 text-center'
                weight='600'
            >Registro usuario admin</Text>

            <TextField
                type="text"
                name="name"
                handleChange={e => handleChange(e, setForm, form)}
                isError={errors.includes('name')}
                helperText={errors.includes('name') ? "Nombre requerido" : ''}
                colorHelperText="#D32F2F"
                value={form.email}
                classes="my-3"
                isFull={true}
                placeholder="Nombre"
            />

            <TextField
                type="text"
                name="lastName"
                handleChange={e => handleChange(e, setForm, form)}
                isError={errors.includes('lastName')}
                helperText={errors.includes('lastName') ? "Apellido requerido" : ''}
                colorHelperText="#D32F2F"
                value={form.email}
                classes="my-3"
                isFull={true}
                placeholder="Apellido"
            />

            <TextField
                type="text"
                name="company"
                handleChange={e => handleChange(e, setForm, form)}
                isError={errors.includes('company')}
                helperText={errors.includes('company') ? "Compañia requerido" : ''}
                colorHelperText="#D32F2F"
                value={form.email}
                classes="my-3"
                isFull={true}
                placeholder="Compañia"
            />

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
                type={isShowPassword.isShow1 ? "password" : "text"}
                name="password"
                handleChange={e => handleChange(e, setForm, form)}
                isError={errors.includes('password')}
                helperText={errors.includes('password') ? "password requerido" : ''}
                colorHelperText="#D32F2F"
                value={form.password}
                placeholder="Contraseña"
                icon={
                    isShowPassword.isShow1
                    ? <IoEyeSharp
                        size={25}
                        color='white'
                        onClick={() => setIsShowPassword({
                            ...isShowPassword,
                            isShow1: false
                        })}
                    />
                    : <IoEyeOffSharp
                        size={25}
                        color='white'
                        onClick={() => setIsShowPassword({
                            ...isShowPassword,
                            isShow1: true
                        })}
                    />
                }
                edge="end"
            />

            <TextField
                type={isShowPassword.isShow2 ? "password" : "text"}
                name="repeatPassword"
                handleChange={e => handleChange(e, setForm, form)}
                isError={errors.includes('repeatPassword')}
                helperText={errors.includes('repeatPassword') ? "password requerido" : ''}
                colorHelperText="#D32F2F"
                value={form.repeatPassword}
                placeholder="Repetir Contraseña"
                classes="my-3"
                icon={
                    isShowPassword.isShow2
                    ? <IoEyeSharp
                        size={25}
                        color='white'
                        onClick={() => setIsShowPassword({
                            ...isShowPassword,
                            isShow2: false
                        })}
                    />
                    : <IoEyeOffSharp
                        size={25}
                        color='white'
                        onClick={() => setIsShowPassword({
                            ...isShowPassword,
                            isShow2: true
                        })}
                    />
                }
                edge="end"
            />

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
                onClick={() => history('/login')}
            >Login</Text>
        </Form>
    </Container>;
}

export default RegisterAdminPage;