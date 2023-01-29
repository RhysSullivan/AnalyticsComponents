import { Box, Typography } from '@mui/material';
import React from 'react';
import { InsightChartProps } from './AnalyticsTypes';

interface InsightBaseProps extends InsightChartProps {
    children?: React.ReactNode;
}

const InsightBase: React.FC<InsightBaseProps> = ({ children, insight, width = 700, height = 400 }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                <Typography px={7} sx={{ textAlign: 'center' }}>
                    <b>{insight.name}</b>
                </Typography>
            </Box>
            {children}
        </Box>
    );
};

export default InsightBase;
