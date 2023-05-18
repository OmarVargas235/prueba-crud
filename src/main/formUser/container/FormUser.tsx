// 1.- librerias
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// 2.- components
import FormUserPage from "../components/FormUserPage";

// 3.- hooks
import { useForm } from "../../../hooks/hookForm/useForm";

// 4.- utils
import { alert, validateEmail } from '../../../helpers/utils';

// 5.- redux
import { setIsActiveLoading } from '../../../redux/reducers/reducerBlockUI';
import { setOpenModalUser, IInitState } from '../../../redux/reducers/openModalUser';
import { RootState } from "../../../redux/reducers";

// 6.- services
import { user } from '../../../services/user';

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

const FormUser = (): JSX.Element => {

    const { type: typeEditOrCreate, user:userRedux } = useSelector<RootState, IInitState>(state => state.modalUser);

    const dispatch = useDispatch();

    const { handleSubmit, handleChange, validateFields, errors, setValuesDefault } = useForm<Model, RequeridFields>();

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

    useEffect(() => {

        if (typeEditOrCreate !== 'EDIT') return undefined;

        setForm({
            name: userRedux.name,
            lastName: userRedux.lastName,
            company: userRedux.company,
            email: userRedux.email,
            password: '',
            repeatPassword: '',
        });

        setValuesDefault('name', userRedux.name);
        setValuesDefault('lastName', userRedux.lastName);
        setValuesDefault('company', userRedux.company);
        setValuesDefault('email', userRedux.email);

    }, [typeEditOrCreate, userRedux]);

    const onSubmit = async (model: object): Promise<void> => {
    
        const newModel = model as Model;

        const isError: boolean = validateFields(newModel, [...requeridFields]);
        
        if (isError) return;

        const isValidateEmail = validateEmail(newModel.email);

        if (!isValidateEmail) return alert({ dispatch, isAlertSuccess: false, message: 'Correo invalido' });

        if (newModel.password !== newModel.repeatPassword) return alert({ dispatch, isAlertSuccess: false, message: 'Los passwords no son iguales' });

        dispatch(setIsActiveLoading(true));

        const result = typeEditOrCreate === 'EDIT'
            ? await user.editUser(userRedux._id, newModel)
            : await user.registerUser(newModel);

        dispatch(setIsActiveLoading(false));

        if (result.status !== 200) return alert({ dispatch, isAlertSuccess: false, message: result.message });

        alert({ dispatch, isAlertSuccess: true, message: result.message });
        dispatch(setOpenModalUser({ isActive: false, type: 'CREATE', updateTable: true }));

        clearForm();
    }

    const clearForm = (): void => {

        setForm({
            name: '',
            lastName: '',
            company: '',
            email: '',
            password: '',
            repeatPassword: '',
        });

        setValuesDefault('name', '');
        setValuesDefault('lastName', '');
        setValuesDefault('company', '');
        setValuesDefault('email', '');
        setValuesDefault('password', '');
        setValuesDefault('repeatPassword', '');
    }

    return <FormUserPage
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        onSubmit={onSubmit}
        form={form}
        setForm={setForm}
        errors={errors}
        isShowPassword={isShowPassword}
        setIsShowPassword={setIsShowPassword}
        clearForm={clearForm}
    />;
}

export default FormUser;