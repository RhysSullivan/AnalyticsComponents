import { Box, Divider, Grid, Stack, styled, TextField, Typography } from '@mui/material';
import React from 'react';
import { ServerModel } from '../../src/types';
import ChannelBrowserDropdown from '../ChannelBrowserDropdown';
import { SanitizedInsightModel } from './AnalyticsTypes';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import InsightBase from './InsightBase';
import { LocalizationProvider, DatePicker, PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Moment } from 'moment';

interface AnalyticsDashboardProps {
    insights: SanitizedInsightModel[];
    server: ServerModel;
    selectedChannelId: string | undefined;
    setSelectedChannelId: (channelId: string | undefined) => void;
    selectedStartDate: Moment | null;
    setSelectedStartDate: (date: Moment | null) => void;
    selectedEndDate: Moment | null;
    setSelectedEndDate: (date: Moment | null) => void;
}
const InsightQuestionsAsked = '846828';
const InsightQuestionsAnswered = '846892';
const InsightMostHelpfulUsers = '846557';
const InsightConsentHighlight = '850368';
const HelpChannelInsightsLeft = [
    InsightQuestionsAsked,
    InsightQuestionsAnswered,
    InsightMostHelpfulUsers,
    InsightConsentHighlight,
];

const InsightChannelActivity = '846923';
const InsightConsentGraph = '833269';
const HelpChannelInsightsRight = [InsightChannelActivity, InsightConsentGraph];

// Discoverability
const InsightJoinsFromAnswerOverflow = '846922';
const InsightMessagePageViewCountHighlight = '850347';
const DiscoverabilityLeft = [InsightMessagePageViewCountHighlight, InsightJoinsFromAnswerOverflow];

const InsightMessagePageViewCountGraph = '846000';
const InsightServerJoinsFromAnswerOverflowGraph = '846679';
const DiscoverabilityRight = [InsightMessagePageViewCountGraph, InsightServerJoinsFromAnswerOverflowGraph];
const InsightSegments = [
    {
        title: 'Help Channel Insights',
        leftInsights: HelpChannelInsightsLeft,
        rightInsights: HelpChannelInsightsRight,
    },
    {
        title: 'Discoverability Insights',
        leftInsights: DiscoverabilityLeft,
        rightInsights: DiscoverabilityRight,
    },
];

const AnalyticsDashboardRenderer: React.FC<AnalyticsDashboardProps> = ({
    server,
    insights,
    selectedChannelId,
    setSelectedChannelId,
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
}) => {
    const filteredIds = new Set(
        insights
            .flatMap((insight) => insight.results.filter((result) => result.breakdown_value))
            .flatMap((result) => result.breakdown_value)
    );

    insights.forEach((insight) => {
        insight.results.forEach((result) => {
            const channel = server.channels?.find((channel) => channel.id === result.breakdown_value);
            if (result.breakdown_value && channel) {
                result.ao_channels.push(channel);
            }
        });
    });
    const insightLookup = new Map<string, SanitizedInsightModel>();
    insights.forEach((insight) => {
        insightLookup.set(insight.id, insight);
    });
    const renderEndDatePicker = (
        date: Moment,
        selectedDates: Array<Moment | null>,
        pickersDayProps: PickersDayProps<Moment>
    ) => {
        return <PickersDay {...pickersDayProps} disabled={date.isAfter() || date.isBefore(selectedStartDate)} />;
    };
    const renderStartDatePicker = (
        date: Moment,
        selectedDates: Array<Moment | null>,
        pickersDayProps: PickersDayProps<Moment>
    ) => {
        return <PickersDay {...pickersDayProps} disabled={date.isAfter() || date.isAfter(selectedEndDate)} />;
    };
    return (
        <Stack spacing={2}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    columnGap: 2,
                    width: '100%',
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    rowGap: 2,
                }}
            >
                <Box sx={{ maxWidth: 300, flexGrow: 1 }}>
                    <ChannelBrowserDropdown
                        channels={
                            server.channels ? server.channels.filter((channel) => filteredIds.has(channel.id)) : []
                        }
                        selectedId={selectedChannelId}
                        allowSelectNone={true}
                        setSelectedId={(value) => setSelectedChannelId(value)}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', columnGap: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            label="Start Date"
                            value={selectedStartDate}
                            onChange={(newValue) => {
                                setSelectedStartDate(newValue);
                            }}
                            renderDay={renderStartDatePicker}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            label="End Date"
                            value={selectedEndDate}
                            onChange={(newValue) => {
                                setSelectedEndDate(newValue);
                            }}
                            renderDay={renderEndDatePicker}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {InsightSegments.map((segment, index) => (
                    <Box key={index}>
                        {index != 0 && <Divider />}
                        <Typography variant="h6" component="span">
                            {segment.title}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        rowGap: 5,
                                        columnGap: 5,
                                    }}
                                >
                                    {segment.leftInsights.map((insightId) => {
                                        const insight = insightLookup.get(insightId);
                                        if (!insight) return null;
                                        return <InsightBase key={insightId} insight={insight} />;
                                    })}
                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {segment.rightInsights.map((insightId) => {
                                        const insight = insightLookup.get(insightId);
                                        if (!insight) return null;
                                        return <InsightBase key={insightId} insight={insight} />;
                                    })}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
            </Box>
        </Stack>
    );
};

export default AnalyticsDashboardRenderer;
