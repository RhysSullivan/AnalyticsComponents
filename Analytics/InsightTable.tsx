import React, { useContext } from 'react';
import { SanitizedInsightModel } from './AnalyticsTypes';
import InsightTableRenderer from './InsightTableRenderer';
import { SelectedChannelContext } from './SelectedChannelContext';

interface InsightTableProps {
    insight: SanitizedInsightModel;
}

const InsightTable: React.FC<InsightTableProps> = ({ insight }) => {
    const custom_name = insight.results.length > 0 ? insight.results[0].ao_custom_name : '';
    const channelFilter = useContext(SelectedChannelContext);

    return (
        <InsightTableRenderer
            name={insight.name}
            insightId={insight.id}
            channelFilter={channelFilter}
            data={insight.results}
            dataName={custom_name}
        />
    );
};

export default InsightTable;
