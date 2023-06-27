import React, { memo } from 'react';
import { Stack, Typography, Button } from 'investira.react.components';
import { useSelector } from 'react-redux';
import app from '../../utils/app';

const Dashboard = memo(() => {
    const username = useSelector(state => state.user.username);

    const handleLogout = () => {
        app.logout();
    };

    return (
        <Stack justifyContent="center" alignItems="center" height="100%">
            <Typography color="textPrimary" variant="h5">
                Hello!
            </Typography>
            <Typography color="textPrimary" variant="body2" gutterBottom>
                {username}
            </Typography>
            <Button variant={'contained'} color={'primary'} onClick={handleLogout}>
                Logout
            </Button>
        </Stack>
    );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
