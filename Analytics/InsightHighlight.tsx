import { Box, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { CompareLabelType, SanitizedInsightModel } from './AnalyticsTypes';
import { isResultFilteredOut } from './AnalyticsUtils';
import InsightHighlightRenderer from './InsightHighlightRenderer';

import { SelectedChannelContext } from './SelectedChannelContext';
interface InsightHighlightProps {
    insight: SanitizedInsightModel;
}

const InsightHighlight: React.FC<InsightHighlightProps> = ({ insight }) => {
    const channelFilter = useContext(SelectedChannelContext);
    const currentPeriodData =
        insight.results.length > 0
            ? insight.results.filter(
                  (result) => result.compare_label && result.compare_label === CompareLabelType.Current
              )
            : null;
    const previousPeriodData =
        insight.results.length > 1
            ? insight.results.filter(
                  (result) => result.compare_label && result.compare_label === CompareLabelType.Previous
              )
            : null;
    if (!currentPeriodData) {
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
                    textAlign: 'center',
                }}
            >
                <Typography color="lightgray">{insight.name}</Typography>
                <Typography variant="body1" component="span">
                    No data found
                </Typography>
            </Box>
        );
    }
    const currentPeriodSum = currentPeriodData.reduce(
        (partialSum, a) => partialSum + (isResultFilteredOut(insight, a, channelFilter) ? 0 : a.aggregated_value),
        0
    );
    const previousPeriodSum = previousPeriodData
        ? previousPeriodData.reduce(
              (partialSum, a) => partialSum + (isResultFilteredOut(insight, a, channelFilter) ? 0 : a.aggregated_value),
              0
          )
        : 0;
    const numberOfDays = currentPeriodData.length > 0 ? currentPeriodData[0].days.length : 0;
    return (
        <InsightHighlightRenderer
            name={insight.name}
            currentPeriodSum={currentPeriodSum}
            previousPeriodSum={previousPeriodSum}
            numberOfDays={numberOfDays}
        />
    );
};

export default InsightHighlight;
