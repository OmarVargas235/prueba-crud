// 1.- librerias
import { useState, useEffect, useLayoutEffect, useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

// 2.- components
import HomePage from "../components/HomePage";

// 3.- interfaces
import { OptionsBadge } from "../interface";
import { User } from '../../../helpers/interface';
import { RootState } from "../../../redux/reducers";

// 4.- services
import { auth } from '../../../services/auth';
import { user } from '../../../services/user';
import { history } from '../../../services/history';

// 5.- context
import { AuthContext } from '../../../auth/AuthProvider';

// 6.- redux
import { setIsActiveLoading } from '../../../redux/reducers/reducerBlockUI';
import { IInitState, setOpenModalUser, setDataModalUser } from '../../../redux/reducers/openModalUser';

// 7.- utils
import { alert } from '../../../helpers/utils';

const Home = (): JSX.Element => {

    const dispatch = useDispatch();

    const { updateTable:updateTableUser } = useSelector<RootState, IInitState>(state => state.modalUser);

    const { setIsAuth } = useContext(AuthContext);

    const [idUserDelete, setId] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [badgeData, setBadgeData] = useState<OptionsBadge>({id: -1, name: ''});
    const [isDelte, setIsDelete] = useState<boolean>(false);
    const [updateTable, setUpdateTable] = useState<boolean>(false);

    const callAPIUsers = useCallback(async () => {

        if (badgeData.id === -1) return undefined;

        dispatch(setIsActiveLoading(true));

        const result = badgeData.id === 1
            ? await user.getUsers()
            : await history.getUsers();

        dispatch(setIsActiveLoading(false));

        if (result.status !== 200) return alert({ dispatch, isAlertSuccess: false, message: result.message });

        setUsers(result.data ?? []);

    }, [badgeData]);

    useLayoutEffect(() => {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function closeMenu(e: any): void {

            const path = e.composedPath();

            if (path === undefined) return;

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            const isClassId = !(path[0].getAttribute('class')?.includes('closeMenu'));

			if (path[0].getAttribute('id') !== 'closeMenu' && isClassId)
                setIsShow(false);
        }

        window.addEventListener('click', closeMenu);

        return () => window.addEventListener('click', closeMenu);

    }, []);

    useEffect(() => {

        void callAPIUsers();

    }, [updateTable, updateTableUser, callAPIUsers]);

    const closeSesion = (): void => {
        auth.logout();
        setIsAuth(false);
    }

    const deleteUser = async (id: string, isCloseModal: boolean): Promise<void> => {
        
        setId(id);

        if (isCloseModal) return setIsDelete(true);

        dispatch(setIsActiveLoading(true));

        const result = await user.deleteUser(idUserDelete);

        dispatch(setIsActiveLoading(false));
        setIsDelete(false);

        if (result.status !== 200) return alert({ dispatch, isAlertSuccess: false, message: result.message });

        alert({ dispatch, isAlertSuccess: true, message: result.message });
        setUpdateTable(!updateTable);

        const data = users.find(v => v._id === idUserDelete) as User;
        void createHistory(data);
    }

    const createHistory = async (data: User): Promise<void> => {

        dispatch(setIsActiveLoading(true));

        const result = await history.registerUser(data);

        if (result.status !== 200) return alert({ dispatch, isAlertSuccess: false, message: result.message });

        alert({ dispatch, isAlertSuccess: true, message: result.message });

        dispatch(setIsActiveLoading(false));
    }

    const edit = (data: User): void => {
        
        dispatch(setDataModalUser(data));
        dispatch(setOpenModalUser({ isActive: true, type: 'EDIT', updateTable: false }));
    }

    return <HomePage
        badgeData={badgeData}
        setBadgeData={setBadgeData}
        isShow={isShow}
        setIsShow={setIsShow}
        closeSesion={closeSesion}
        users={users}
        deleteUser={deleteUser}
        isDelte={isDelte}
        setIsDelete={setIsDelete}
        edit={edit}
    />;
}

export default Home;