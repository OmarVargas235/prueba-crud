// 1.- librerias
import { useState, useLayoutEffect, useContext } from "react";

// 2.- components
import HomePage from "../components/HomePage";

// 3.- interfaces
import { OptionsBadge } from "../interface";

// 4.- services
import { auth } from '../../../services/auth';

// 5.- context
import { AuthContext } from '../../../auth/AuthProvider';

const Home = (): JSX.Element => {

    const { setIsAuth } = useContext(AuthContext);

    const [isShow, setIsShow] = useState<boolean>(false);
    const [badgeData, setBadgeData] = useState<OptionsBadge>({id: -1, name: ''});

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

    const closeSesion = (): void => {
        auth.logout();
        setIsAuth(false);
    }

    return <HomePage
        badgeData={badgeData}
        setBadgeData={setBadgeData}
        isShow={isShow}
        setIsShow={setIsShow}
        closeSesion={closeSesion}
    />;
}

export default Home;