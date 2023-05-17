// 1.- librerias
import { Routes, Route, Navigate } from 'react-router-dom';

// 2.- components
import Home from '../main/home';

const RouterPublic = (): JSX.Element => {

    return <Routes>
        <Route path='/home' element={<Home />} />

        <Route
            path="*"
            element={<Navigate to="/home" replace />}
        />
    </Routes>;
}

export default RouterPublic;