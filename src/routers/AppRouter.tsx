// 1.- librerias
import { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// 2.- components
import RouterPublic from './RouterPublic';
import RouterPrivate from './RouterPrivate';
import Alert from '../layauts/alert/Alert';
import Spinner from '../layauts/spinner/Spinner';

// 3.- context
import { AuthContext } from '../auth/AuthProvider';

const AppRouter = (): JSX.Element => {

    const { isAuth } = useContext(AuthContext);

    return <Router>

        <Alert />
        <Spinner />

        {
            isAuth
                ? <RouterPrivate />
                : <RouterPublic />
        }
    </Router>;
}

export default AppRouter;