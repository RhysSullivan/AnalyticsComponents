import { Box, LinearProgress, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useServerAnalytics } from '../../src/hooks/requests';
import { ServerModel } from '../../src/types';
import AnalyticsDashboardRenderer from './AnalyticsDashboardRenderer';
import { SelectedChannelContext } from './SelectedChannelContext';
import { Moment } from 'moment';
import moment from 'moment';

interface AnalyticsDashboardProps {
    server: ServerModel;
}
//.format('YYYY-MM-DD')
const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ server }) => {
    const [selectedChannelId, setSelectedChannelId] = useState<string | undefined>(undefined);
    const [startDate, setStartDate] = React.useState<Moment | null>(moment().subtract(2, 'weeks'));
    const [endDate, setEndDate] = React.useState<Moment | null>(moment());
    const {
        data: insights,
        isError: analyticsError,
        isLoading: analyticsLoading,
    } = useServerAnalytics(server, startDate, endDate);

    return (
        <Box
            sx={{
                backgroundColor: '#141414',
                minHeight: '70vh',
                padding: '20px',
            }}
        >
            <Box sx={{ textAlign: 'center', paddingBottom: 2 }}>
                <Typography variant={'h4'}>Analytics</Typography>
            </Box>
            {insights != null && (
                <SelectedChannelContext.Provider value={selectedChannelId}>
                    <AnalyticsDashboardRenderer
                        insights={insights}
                        server={server}
                        selectedChannelId={selectedChannelId}
                        setSelectedChannelId={setSelectedChannelId}
                        selectedStartDate={startDate}
                        setSelectedStartDate={setStartDate}
                        selectedEndDate={endDate}
                        setSelectedEndDate={setEndDate}
                    />
                </SelectedChannelContext.Provider>
            )}
            {analyticsLoading && (
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <Typography>Loading analytics...</Typography>
                    <LinearProgress />
                </Box>
            )}
            {analyticsError && (
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <Typography>Encountered an error fetching analytics.</Typography>
                </Box>
            )}
        </Box>
    );
};

export default AnalyticsDashboard;
