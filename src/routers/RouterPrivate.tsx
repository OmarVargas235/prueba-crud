// 1.- librerias
import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 2.- components
import Spinner from '../layauts/spinner/Spinner';
const Home = lazy(async () => await import('../main/home'));
const FormUser = lazy(async () => await import('../main/formUser'));

const RouterPublic = (): JSX.Element => {

    return <Suspense fallback={<Spinner isLoading={true} />}>

        <FormUser />

        <Routes>
            <Route path='/home' element={<Home />} />

            <Route
                path="*"
                element={<Navigate to="/home" replace />}
            />
        </Routes>
    </Suspense>;
}

export default RouterPublic;