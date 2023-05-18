// 1.- librerias
import axios from "axios";
import { createGlobalStyle } from 'styled-components';

// 2.- components
import AppRouter from './routers/AppRouter';

/**
 * Axios HTTP Request defaults
 */
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = '*';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		padding: 0;
        background-color: #1C1E33;
	}
`;

function App(): JSX.Element {

    return <>

        <GlobalStyle />
        <AppRouter />
    </>;
}

export default App;