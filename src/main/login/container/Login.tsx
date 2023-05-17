// 1.- librerias
import { useState, useContext } from "react";
import { useDispatch } from "react-redux";

// 2.- components
import LoginPage from "../components/LoginPage";

// 3.- hooks
import { useForm } from "../../../hooks/hookForm/useForm";

// 4.- context
import { AuthContext } from '../../../auth/AuthProvider';

// 5.- utils
import { alert, validateEmail } from '../../../helpers/utils';

// 6.- redux
import { setIsActiveLoading } from '../../../redux/reducers/reducerBlockUI';

export interface Model {
    email: string;
    password: string;
}

const requeridFields = ['email', 'password'] as const;
export type RequeridFields = typeof requeridFields[number];

const Login = (): JSX.Element => {

    const dispatch = useDispatch();

    const { submitLogin } = useContext(AuthContext);

    const { handleSubmit, handleChange, validateFields, errors } = useForm<Model, RequeridFields>();

    const [form, setForm] = useState<Model>({
        email: '',
        password: ''
    });

    const onSubmit = async (model: object): Promise<void> => {
    
        const newModel = model as Model;
        
        const isError: boolean = validateFields(newModel, [...requeridFields]);
        
        if (isError) return;

        const isValidateEmail = validateEmail(newModel.email);
        if (!isValidateEmail) return alert({ dispatch, isAlertSuccess: false, message: 'Correo invalido' });

        dispatch(setIsActiveLoading(true));

        const result = await submitLogin(newModel);

        dispatch(setIsActiveLoading(false));

        if (result.status !== 200) return alert({ dispatch, isAlertSuccess: false, message: result.message });
    }

    return <LoginPage
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        onSubmit={onSubmit}
        form={form}
        setForm={setForm}
        errors={errors}
    />;
}

export default Login;