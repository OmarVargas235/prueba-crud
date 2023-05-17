// 1.- librerias
import { Routes, Route, Navigate } from 'react-router-dom';

// 2.- components
import Login from '../main/login';

const RouterPublic = (): JSX.Element => {

    return <Routes>
        <Route path='/login' element={<Login />} />

        <Route
            path="*"
            element={<Navigate to="/login" replace />}
        />
    </Routes>;
}

export default RouterPublic;