import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Box, Card, CardContent } from "@mui/material";
import CampaignForm from "./components/CampaignForm";
import CampaignList from "./components/CampaignList";
import { Campaign } from "./types";

import { Grid } from "@mui/material";


const API_URL = "https://campaign-app-1.onrender.com";
function App() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [balance, setBalance] = useState<number>(0);

    const fetchCampaigns = () => {
        axios.get<Campaign[]>(`${API_URL}/api/campaigns`)
            .then(res => setCampaigns(res.data))
            .catch(err => console.error(err));
    };

    const fetchBalance = () => {
        axios.get<number>(`${API_URL}/api/account/1`)
            .then(res => setBalance(res.data))
            .catch(err => console.error("Cannot get a balance", err));
    };
    const refreshAll = () => {
        fetchCampaigns();
        fetchBalance();
    };

    useEffect(() => {
        refreshAll();
    }, []);

    const handleDelete = (id: number) => {
        axios.delete(`${API_URL}/api/campaigns/${id}`)
            .then(() => {
                refreshAll();
            })
            .catch(err => {
                console.error(err);
                alert("Not able to delete the campaign.");
            });
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Box textAlign="center" mb={4}>
                <Typography variant="h3" component="h1" color="primary" gutterBottom>
                    Emerald Account Manager
                </Typography>

                <Box display="flex" justifyContent="center" mb={2}>
                    <Card  elevation={6} className="emerald-card">
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Emerald Account
                            </Typography>
                            <Typography variant="h4" component="div" color="success.main" fontWeight="bold">
                                {balance.toFixed(2)} PLN
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <CampaignForm onCampaignAdded={refreshAll} />
                </Grid>

                <Grid item xs={12}>
                    <CampaignList campaigns={campaigns} onDelete={handleDelete} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;