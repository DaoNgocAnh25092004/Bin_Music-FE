import { useEffect } from 'react';

import * as GoogleService from '~/Services/GoogleService';

function Library() {
    const getInfo = async () => {
        await GoogleService.GetUserInfo();
    };

    useEffect(() => {
        getInfo();
    }, []);

    return <div>Thư viên</div>;
}

export default Library;
