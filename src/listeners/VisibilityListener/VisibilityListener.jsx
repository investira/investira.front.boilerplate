import React, { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OverLoading } from 'investira.react.components';

import services from '../../services';
import {
    acAuthIsFetching,
    acAuthUpdateStatusToken,
    acAuthLogin,
    acAuthTokenNoExpired
} from '../../store/actions';
import usePrevious from '../../hooks/usePrevious';
import { validators } from 'investira.sdk';

const VisibilityListener = memo(() => {
    const dispatch = useDispatch();
    const visibility = useSelector(state => state.app.visibility);
    const accessToken = useSelector(state => state.authLogin.accessToken);
    const expiresToken = useSelector(state => state.authLogin.expiresToken);
    const [isSyncing, setSyncing] = useState(false);
    const prevVisibility = usePrevious(visibility);

    function updateStore(pAction, pData) {
        dispatch(pAction(pData));
    }

    function verifyTokenExpires(pExpiresToken) {
        const xCurrentDate = new Date().getTime();
        const xExpiresDate = new Date(pExpiresToken).getTime();

        return xCurrentDate > xExpiresDate;
    }

    function refreshToken() {
        const xAccessToken = accessToken;
        const xExpiresToken = expiresToken;

        if (!validators.isNull(xAccessToken) && verifyTokenExpires(xExpiresToken)) {
            updateStore(acAuthIsFetching, true);
            updateStore(acAuthUpdateStatusToken, 'updating');

            services.auth.refreshToken(
                {},
                rRes => {
                    updateStore(acAuthLogin, rRes.data);
                    updateStore(acAuthIsFetching, false);
                    updateStore(acAuthUpdateStatusToken, 'valid');
                },
                rErr => {
                    updateStore(acAuthIsFetching, false);
                    updateStore(acAuthUpdateStatusToken, 'invalid');
                }
            );
        } else {
            updateStore(acAuthTokenNoExpired);
        }
    }

    useEffect(() => {
        if (
            !validators.isNull(prevVisibility) &&
            prevVisibility === 'hidden' &&
            visibility === 'visible'
        ) {
            refreshToken();
        }
    }, [visibility, prevVisibility]);

    return <OverLoading open={isSyncing} />;
});

VisibilityListener.displayName = 'VisibilityListener';

export default VisibilityListener;
