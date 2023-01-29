import { Box, Typography } from '@mui/material';
import React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RemoveIcon from '@mui/icons-material/Remove';

type InsightHighlighRendererProps = {
    name: string;
    currentPeriodSum: number;
    previousPeriodSum: number;
    numberOfDays: number;
};

const InsightHighlighRenderer: React.FC<InsightHighlighRendererProps> = ({
    name,
    currentPeriodSum,
    previousPeriodSum,
    numberOfDays,
}) => {
    const change = currentPeriodSum - previousPeriodSum;
    let percentChange = 0;
    let changeArrow = <RemoveIcon />;
    if (change == 0) {
        percentChange = 0;
        changeArrow = <RemoveIcon />;
    } else if (previousPeriodSum == 0) {
        percentChange = 100;
        changeArrow = <PlayArrowIcon fontSize="small" sx={{ transform: 'rotate(-90deg)', color: 'lightgreen' }} />;
    } else {
        percentChange = (change / previousPeriodSum) * 100;
        changeArrow = (
            <PlayArrowIcon
                fontSize="small"
                sx={{
                    transform: percentChange > 0 ? 'rotate(-90deg)' : 'rotate(90deg)',
                    color: percentChange > 0 ? 'lightgreen' : '#C24641',
                }}
            />
        );
    }
    return (
        <Box
            sx={{
                backgroundColor: '#1E1E1E',
                borderRadius: 1,
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                columnGap: 3,
                width: '300px',
            }}
        >
            <Typography color="lightgray">{name}</Typography>
            <Typography variant="h4" component="span">
                <b>{currentPeriodSum}</b>
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                {changeArrow}
                <Typography color="darkgray" variant="subtitle2">
                    {percentChange.toFixed(2)}% ({change}) over the past {numberOfDays}{' '}
                    {numberOfDays > 1 ? 'days' : 'day'}
                </Typography>
            </Box>
        </Box>
    );
};

export default InsightHighlighRenderer;
