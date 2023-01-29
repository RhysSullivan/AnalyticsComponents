import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

import { colorLookup } from './AnalyticsUtils';
import { InsightChartProps } from './AnalyticsTypes';

const InsightBar: React.FC<InsightChartProps> = ({ insight, data, names, width = 700, height = 400 }) => {
    const renderBar = (name: string, index: number) => {
        return <Bar type="monotone" dataKey={name} key={index} fill={colorLookup[index % 7]} r={0} stackId="a" />;
    };

    return (
        <BarChart width={width} height={height} data={data}>
            {names.map((name, index) => renderBar(name, index))}
            <CartesianGrid strokeLinecap={'square'} vertical={false} />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 'dataMax + 1']} />
            <Tooltip contentStyle={{ backgroundColor: 'black' }} cursor={{ fill: 'darkgrey', opacity: 0.5 }} />
            <Legend />
        </BarChart>
    );
};

export default InsightBar;
