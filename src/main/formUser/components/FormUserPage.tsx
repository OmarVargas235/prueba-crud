// 1.- librerias
import { useSelector, useDispatch } from "react-redux";

// 2.- components
import { Container } from '../styled';
import Modal from "../../../layauts/modal/Modal";
import Form from "../../../layauts/form/Form";
import TextField from "../../../layauts/textField/TextField";
import { Text } from "../../../layauts/Text";
import Button from "../../../layauts/button/Button";

// 4.- interfaces
import { HandleSubmit, HandleChange } from "../../../hooks/hookForm/interface";
import { Model, RequeridFields } from "../container/FormUser";
import { RootState } from "../../../redux/reducers";

// 5.- iconos
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

// 6.- redux
import { setOpenModalUser, IInitState } from '../../../redux/reducers/openModalUser';

interface Props {
    handleSubmit: HandleSubmit<Model>;
    handleChange: HandleChange<Model>;
    onSubmit: (v: object) => Promise<void>;
    form: Model;
    setForm: (v: Model) => void;
    errors: RequeridFields[];
    isShowPassword: {isShow1: boolean; isShow2: boolean};
    setIsShowPassword: (v: {isShow1: boolean; isShow2: boolean}) => void;
    clearForm: () => void;
}

const FormUserPage = ({ handleChange, handleSubmit, onSubmit, form, setForm, errors, isShowPassword,setIsShowPassword, clearForm }: Props): JSX.Element => {

    const dispatch = useDispatch();

    const { isActive, type } = useSelector<RootState, IInitState>(state => state.modalUser);
    
    return <Container>        
        <Modal
            closeModal={(v) => {

                dispatch(setOpenModalUser({ isActive: v, type: 'CREATE' }));
                clearForm();
            }}
            open={isActive}
            textBtn=''
            isButton={false}
        >
            <Form
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                className="form p-3"
            >
                <Text
                    size='24px'
                    className='mb-4 text-center'
                    weight='600'
                    color='white'
                >{type === 'CREATE' ? 'Registro' : 'Editar'} usuario</Text>

                <TextField
                    type="text"
                    name="name"
                    handleChange={e => handleChange(e, setForm, form)}
                    isError={errors.includes('name')}
                    helperText={errors.includes('name') ? "Nombre requerido" : ''}
                    colorHelperText="#D32F2F"
                    value={form.name}
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
                    value={form.lastName}
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
                    value={form.company}
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
                    >Registrar</Button>
                </div>
            </Form>
        </Modal>
    </Container>;
}

export default FormUserPage;