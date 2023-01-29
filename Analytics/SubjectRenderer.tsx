import { Box, Typography } from '@mui/material';
import React from 'react';
import { UserModel, ChannelModel, ServerModel } from '../../src/types';
import UserIcon from '../UserIcon';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { showSuccess } from '../../src/utils';
import { isChannelModel, isServerModel, isUserModel } from './AnalyticsUtils';
interface SubjectRendererProps {
    subject: string | number | UserModel | ChannelModel | ServerModel | number[];
}

const SubjectRenderer: React.FC<SubjectRendererProps> = ({ subject }) => {
    // if subject is a user model, render a user avatar and name
    if (isUserModel(subject)) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 1 }}>
                <UserIcon user={subject} size={48} />
                <Box
                    sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: 1 }}
                    className="hover-parent"
                    onClick={() => {
                        const convertedMention = '<@' + subject.id + '>';
                        navigator.clipboard.writeText(convertedMention);
                        showSuccess(`Copied mention for ${subject.name} to clipboard`, 1500);
                    }}
                >
                    <ContentCopyIcon className="show-on-hover" />
                    <Typography variant="h6" component="span">
                        {subject.name}
                    </Typography>
                </Box>
            </Box>
        );
    }
    if (isChannelModel(subject)) {
        return <div>{subject.name}</div>;
    }
    if (isServerModel(subject)) {
        return <div>{subject.name}</div>;
    }
    return <Typography>subject</Typography>;
};

export default SubjectRenderer;
