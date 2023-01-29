import { Box, FormControl, InputLabel, MenuItem, Select, Theme, Typography, useMediaQuery } from '@mui/material';
import React, { useContext, useState } from 'react';
import InsightBar from './InsightBar';
import InsightLine from './InsightLine';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { InsightChartProps, ChartDisplayType, SanitizedInsightModel } from './AnalyticsTypes';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import InsightTable from './InsightTable';
import InsightChartBase from './InsightChartBase';
import InsightHighlight from './InsightHighlight';
import { useFormatInsightData } from './AnalyticsUtils';
import { SelectedChannelContext } from './SelectedChannelContext';
import useWindowDimensions, { useIsMobileView } from '../../src/utils';
type InsightLineProps = {
    insight: SanitizedInsightModel;
};

const InsightBase: React.FC<InsightLineProps> = ({ insight }) => {
    const [displayType, setDisplayType] = useState(
        insight.ao_filters.display ? insight.ao_filters.display : ChartDisplayType.ActionsLineGraph
    );
    const channelFilter = useContext(SelectedChannelContext);
    const { data, names } = useFormatInsightData(insight, channelFilter);
    let displayData: EmotionJSX.Element | null = null;

    switch (displayType) {
        case ChartDisplayType.ActionsLineGraph:
            displayData = (
                <InsightChartBase insight={insight} data={data} names={names}>
                    <InsightLine insight={insight} data={data} names={names} />
                </InsightChartBase>
            );
            break;
        case ChartDisplayType.ActionsBar:
            displayData = (
                <InsightChartBase insight={insight} data={data} names={names}>
                    <InsightBar insight={insight} data={data} names={names} />
                </InsightChartBase>
            );
            break;
        case ChartDisplayType.ActionsTable:
            if (insight.tags && insight.tags.includes('highlight')) {
                displayData = <InsightHighlight insight={insight} />; // Assumption is we're just looking at one attribute so let's highlight it
            } else {
                displayData = <InsightTable insight={insight} />;
            }
            break;
        case ChartDisplayType.BoldNumber:
            displayData = <InsightHighlight insight={insight} />;
            break;
    }

    const selectGraphType = (
        <FormControl size="small">
            <Select value={displayType} onChange={(val) => setDisplayType(val.target.value as ChartDisplayType)}>
                <MenuItem value={ChartDisplayType.ActionsBarValue}>
                    <BarChartIcon />
                </MenuItem>
                <MenuItem value={ChartDisplayType.ActionsLineGraph}>
                    <ShowChartIcon />
                </MenuItem>
            </Select>
        </FormControl>
    );
    return <>{displayData}</>;
};

export default InsightBase;
