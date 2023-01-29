import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { colorLookup } from './AnalyticsUtils';
import { InsightChartProps } from './AnalyticsTypes';
import { Box, Divider, Typography } from '@mui/material';

const InsightLine: React.FC<InsightChartProps> = ({ insight, data, names, width = 700, height = 400 }) => {
    const renderLine = (name: string, index: number) => {
        return <Line type="monotone" dataKey={name} key={index} stroke={colorLookup[index % 7]} r={0} />;
    };
    let dataSum = 0;
    data.forEach((d) =>
        names.forEach((name) => {
            dataSum += d[name];
        })
    );

    if (dataSum === 0) {
        return (
            <ResponsiveContainer width="99%" aspect={1.5}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: '#707070',
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderRadius: 3,
                            height: '100%',
                            width: '90%',
                            paddingBottom: 3,
                        }}
                    >
                        <Typography variant="body1">No data to display, it may take a few days to populate</Typography>
                    </Box>
                </Box>
            </ResponsiveContainer>
        );
    }

    return (
        <ResponsiveContainer width="99%" aspect={1.5}>
            <LineChart data={data}>
                <Legend
                    layout="horizontal"
                    verticalAlign="top"
                    align="left"
                    wrapperStyle={{ paddingLeft: 50, paddingRight: 50, paddingBottom: 10 }}
                />
                {names.map((name: string, index: number) => renderLine(name, index))}
                <CartesianGrid strokeLinecap={'square'} vertical={false} />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 'dataMax + 1']} />
                <Tooltip contentStyle={{ backgroundColor: '#30303075' }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default InsightLine;
