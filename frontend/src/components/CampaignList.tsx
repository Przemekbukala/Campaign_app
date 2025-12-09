import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Typography, Chip, Button
} from '@mui/material';
import { Campaign } from '../types';

interface Props {
    campaigns: Campaign[];
    onDelete: (id: number) => void;
}

const CampaignList: React.FC<Props> = ({ campaigns, onDelete }) => {
    return (
        <TableContainer component={Paper} elevation={3}>
            <Typography variant="h6" sx={{ p: 2 }}>Campaign List</Typography>
            <Table>
                <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Keywords</TableCell>
                        <TableCell>Campaign found</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {campaigns.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center">No campaigns to display</TableCell>
                        </TableRow>
                    ) : (
                        campaigns.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell><strong>{row.name}</strong></TableCell>
                                <TableCell>
                                    {row.keywords.map(k => (
                                        <Chip key={k} label={k} size="small" sx={{ mr: 0.5 }} />
                                    ))}
                                </TableCell>
                                <TableCell>{row.campaignFund} PLN</TableCell>
                                <TableCell>
                  <span style={{ color: row.status === 'ON' ? 'green' : 'red', fontWeight: 'bold' }}>
                    {row.status}
                  </span>
                                </TableCell>
                                <TableCell>{row.town} ({row.radius} km)</TableCell>
                                <TableCell>
                                    <Button color="error" onClick={() => row.id && onDelete(row.id)}>
                                        Usuń
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CampaignList;