import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import React from 'react';
import { getReferencedSubject, getSubjectName } from './AnalyticsUtils';
import SubjectRenderer from './SubjectRenderer';

interface InsightTableRendererProps {
    name: string;
    data: any[];
    dataName: string;
    channelFilter?: string;
    insightId?: string;
}

const InsightTableRenderer: React.FC<InsightTableRendererProps> = ({
    name,
    insightId,
    channelFilter,
    data,
    dataName,
}) => {
    return (
        <Box sx={{ width: '100%' }}>
            <TableContainer component={Paper} sx={{ maxHeight: 400, overflowY: 'scroll' }}>
                <Table sx={{ width: '100%' }} aria-label="Most Helpful Users Table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                {name}
                                {insightId == '846557' && channelFilter && (
                                    <Tooltip title="Cannot Currently Be Filtered Per Channel" disableInteractive>
                                        <IconButton aria-hidden size="small">
                                            🚧
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </TableCell>
                            <TableCell align="right">{dataName}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((entry) => {
                            const subject = getReferencedSubject(entry);
                            const subjectName = getSubjectName(subject);
                            return (
                                <TableRow key={subjectName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <SubjectRenderer subject={subject} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="h6" component="span">
                                            {entry.aggregated_value}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {data.length == 0 && (
                            <>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        No Data Found
                                    </TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default InsightTableRenderer;
