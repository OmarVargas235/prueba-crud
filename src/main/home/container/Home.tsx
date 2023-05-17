// 1.- librerias
import { useState, useEffect, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

// 2.- components
import HomePage from "../components/HomePage";

// 3.- services
import { store } from '../../../services/stores';

// 3.- utils
import { alert } from '../../../helpers/utils';

// 4.- interface
import { Store } from '../../../helpers/interface';

// 5.- interface
import { setIsActiveLoading } from '../../../redux/reducers/reducerBlockUI';

const Home = (): JSX.Element => {

    const dispatch = useDispatch();

    const [storesStatic, setStoresStatic] = useState<Store[]>([]);
    const [stores, setStores] = useState<Store[]>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {

        async function callAPI(): Promise<void> {

            dispatch(setIsActiveLoading(true));

            const result = await store.getStores();

            dispatch(setIsActiveLoading(false));

            if (result.status !== 200 || result.data === null) return alert({ dispatch, isAlertSuccess: false, message: result.message });

            setStores(result.data);
            setStoresStatic(result.data);
        }

        void callAPI();

    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {

        const text = e.target.value.toLowerCase();
        setSearch(text);

        const data = storesStatic.filter(v => {

            const position = v.title.toLowerCase().indexOf(text);
            return position > -1;
        });

        setStores(data);
    }

    return <HomePage
        stores={stores}
        search={search}
        handleChange={handleChange}
    />;
}

export default Home;