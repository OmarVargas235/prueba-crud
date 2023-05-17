// 1.- librerias
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 2.- components
import Spinner from '../layauts/spinner/Spinner';
const Login = lazy(async () => await import('../main/login'));
const RegisterAdmin = lazy(async () => await import('../main/registerAdmin'));

const RouterPublic = (): JSX.Element => {

    return <Suspense fallback={<Spinner isLoading={true} />}>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register-admin' element={<RegisterAdmin />} />

            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />
        </Routes>
    </Suspense>;
}

export default RouterPublic;