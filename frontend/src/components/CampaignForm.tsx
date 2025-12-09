import React, { useState } from 'react';
import {
    TextField, Button, Select, MenuItem, InputLabel, FormControl,
    Paper, Typography, Autocomplete, SelectChangeEvent, Grid
} from '@mui/material';
import axios from 'axios';
import { Campaign, CampaignStatus } from '../types';

const TOWNS = ["Warsaw", "Krakow", "Gdansk", "Wroclaw", "Poznan","Egipt", "Sandomierz"];
const KEYWORDS_LIST = ["Shoes", "Sport", "Sale", "Summer", "Winter", "Discount","Holidays"];
const STATUSES = [CampaignStatus.ON, CampaignStatus.OFF];
const API_URL = "https://campaign-app-1.onrender.com";

interface Props {
    onCampaignAdded: () => void;
}

const CampaignForm: React.FC<Props> = ({ onCampaignAdded }) => {
    const initialState: Campaign = {
        name: '',
        keywords: [],
        bidAmount: 1,
        campaignFund: 0,
        status: '' as any,
        town: '',
        radius: 0
    };

    const [formData, setFormData] = useState<Campaign>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'bidAmount' || name === 'campaignFund' || name === 'radius'
                ? parseFloat(value)
                : value
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent<CampaignStatus | string>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name as string]: value }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.keywords.length === 0) {
            alert("You must select at least one keyword.");
            return;
        }

        try {
            await axios.post(`${API_URL}/api/campaigns`, formData);
            onCampaignAdded();
            setFormData(initialState);
        } catch (error) {
            console.error("Error:", error);
            alert("Not enough funds or invalid data.");
        }
    };


    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Add new campaign</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>

                    <Grid item xs={12}>
                        <TextField fullWidth label="Campaign name" name="name" required
                                   value={formData.name} onChange={handleChange} />
                    </Grid>

                    <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            options={KEYWORDS_LIST}
                            value={formData.keywords}
                            onChange={(event, newValue) => {
                                setFormData({ ...formData, keywords: newValue });
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...(params as any)}
                                    label="Keywords *"
                                    placeholder="Choice"
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField fullWidth type="number" label="Bid amount" name="bidAmount"
                                   value={formData.bidAmount} onChange={handleChange} inputProps={{ min: 1 }} required />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth type="number" label="Campaign fund" name="campaignFund"
                                   value={formData.campaignFund} onChange={handleChange} inputProps={{ min: 0 }} required
                                   />
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth required>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                labelId="status-label"
                                name="status"
                                value={formData.status}
                                label="Status"
                                onChange={handleSelectChange}
                            >
                                <MenuItem value={CampaignStatus.ON}>ON</MenuItem>
                                <MenuItem value={CampaignStatus.OFF}>OFF</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Town</InputLabel>
                            <Select name="town" value={formData.town} label="Town" onChange={handleSelectChange}>
                                {TOWNS.map(town => <MenuItem key={town} value={town}>{town}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth type="number" label="Radius" name="radius"
                                   value={formData.radius} onChange={handleChange} required />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" size="large" fullWidth>
                            Make
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Paper>
    );
};

export default CampaignForm;