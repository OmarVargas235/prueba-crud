// 1.- librerias
import { useState } from "react";

// 2.- components
import HomePage from "../components/HomePage";

// 3.- interfaces
import { OptionsBadge } from "../interface";

const Home = (): JSX.Element => {

    const [badgeData, setBadgeData] = useState<OptionsBadge>({id: -1, name: ''});

    return <HomePage
        badgeData={badgeData}
        setBadgeData={setBadgeData}
    />;
}

export default Home;