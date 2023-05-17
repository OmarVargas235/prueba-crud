// 1.- librerias
import { useState, useContext } from "react";
import { useDispatch } from "react-redux";

// 2.- components
import RegisterAdminPage from "../components/RegisterAdminPage";

// 3.- hooks
import { useForm } from "../../../hooks/hookForm/useForm";

// 4.- context
import { AuthContext } from '../../../auth/AuthProvider';

// 5.- utils
import { alert, validateEmail } from '../../../helpers/utils';

// 6.- redux
import { setIsActiveLoading } from '../../../redux/reducers/reducerBlockUI';

export interface Model {
    name: string;
    lastName: string;
    company: string;
    email: string;
    password: string;
    repeatPassword: string;
}

const requeridFields = ['name', 'lastName', 'company', 'email', 'password', 'repeatPassword'] as const;
export type RequeridFields = typeof requeridFields[number];

const RegisterAdmin = (): JSX.Element => {

    const dispatch = useDispatch();

    const { submitLogin } = useContext(AuthContext);

    const { handleSubmit, handleChange, validateFields, errors } = useForm<Model, RequeridFields>();

    const [isShowPassword, setIsShowPassword] = useState<{isShow1: boolean; isShow2: boolean;}>({
        isShow1: true,
        isShow2: true,
    });
    const [form, setForm] = useState<Model>({
        name: '',
        lastName: '',
        company: '',
        email: '',
        password: '',
        repeatPassword: '',
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

    return <RegisterAdminPage
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        onSubmit={onSubmit}
        form={form}
        setForm={setForm}
        errors={errors}
        isShowPassword={isShowPassword}
        setIsShowPassword={setIsShowPassword}
    />;
}

export default RegisterAdmin;