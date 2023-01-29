import Result from '../../pages/m/[message_id]';
import { ChannelModel, ServerModel, UserModel } from '../../src/types';
import { SanitizedInsightModel, SanitizedResultModel } from './AnalyticsTypes';

export const colorLookup = [
    '#33b1ff',
    '#6fdc8c',
    '#ff7eb6',
    '#8a3ffc',
    '#bae6ff',
    '#fff1f1',
    '#d12771',
    '#d2a106',
    '#007d79',
    '#fa4d56',
    '#4589ff',
    '#08bdba',
    '#ba4e00',
    '#d4bbff',
];

export const isResultFilteredOutChannel = (
    insight: SanitizedInsightModel,
    result: SanitizedResultModel,
    channelFilter: string | undefined
) => {
    const isChannelInsight = insight.tags?.find((tag) => tag === 'channel');
    if (channelFilter && isChannelInsight) {
        const doesChannelIdMatchFilter = channelFilter === result.breakdown_value
        return !doesChannelIdMatchFilter
    }    
    return false;
};

export const isResultFilteredOut = (insight: SanitizedInsightModel,
    result: SanitizedResultModel,
    channelFilter: string | undefined): boolean => {
        if (isResultFilteredOutChannel(insight, result, channelFilter)) {
            return true;
        }
        return false;

    };

export const useFormatInsightData = (insight: SanitizedInsightModel, channelFilter: string | undefined) => {
    const data: {}[] = [];
    const namesSet: Set<string> = new Set();
    if (insight.results.length > 0) {
        const firstResult = insight.results[0];
        firstResult.labels.forEach((label, index) => {
            const dayData = {};
            insight.results.forEach((result: SanitizedResultModel) => {
                const dataPoint = result.data[index];
                const hasChannelTag = insight.tags?.find((tag) => tag === 'channel');
                const dataName = getDataName(result, channelFilter, 'channel');
                if (!isResultFilteredOut(insight, result, channelFilter))
                 {
                    dayData[dataName] = dataPoint;
                    namesSet.add(dataName);
                }
            });
            dayData['name'] = label;
            data.push(dayData);
        });
    }
    const names: string[] = [];
    namesSet.forEach((name) => {
        names.push(name);
    });
    return { data, names };
};

export const getSubjectName = (data: string | number | UserModel | ChannelModel | ServerModel | number[]) => {
    if (typeof data === 'string' || typeof data === 'number') {
        return data;
    } else if (Array.isArray(data)) {
        return data.length;
    } else {
        return data.name;
    }
};

export const getReferencedSubject = (result: SanitizedResultModel) => {
    if (result.breakdown_value != null) {
        const user = result.ao_users.find((user) => user.id == result.breakdown_value);
        const channel = result.ao_channels.find((channel) => channel.id == result.breakdown_value);
        const server = result.ao_servers.find((server) => server.id == result.breakdown_value);
        if (user != null) {
            return user;
        } else if (channel != null) {
            return channel;
        } else if (server != null) {
            return server;
        }
        return result.breakdown_value;
    }
    return result.data;
};

export function isUserModel(subject: any): subject is UserModel {
    return (subject as UserModel).avatar !== undefined;
}

export function isServerModel(subject: any): subject is ServerModel {
    return (subject as ServerModel).is_owner !== undefined;
}

export function isChannelModel(subject: any): subject is ChannelModel {
    return (subject as ChannelModel).type !== undefined;
}

export const getResultName = (result: SanitizedResultModel, channelFilter: string | undefined) => {
    const subject = getReferencedSubject(result);
    if (isUserModel(subject)) {
        return subject.name;
    }
    if (isServerModel(subject)) {
        return subject.name;
    }
    if (isChannelModel(subject)) {
        return subject.name;
    }
    return subject.toString();
};

export const getDataName = (
    result: SanitizedResultModel,
    channelFilter: string | undefined,
    type: undefined | 'channel' = undefined
): string => {
    if (result.breakdown_value != null) {
        if (type == 'channel') {
            if (channelFilter != null) {
                const channelName =
                    result.ao_channels.find((channel) => channel.id == result.breakdown_value)?.name ?? 'Unknown';
                const combinedName = `${result.ao_custom_name} - (${channelName})`;
                return combinedName;
            } else {
                return result.ao_custom_name;
            }
        }
        const breakdown_value = result.breakdown_value;
        return breakdown_value.toString();
    }
    return result.ao_custom_name.toString();
};
