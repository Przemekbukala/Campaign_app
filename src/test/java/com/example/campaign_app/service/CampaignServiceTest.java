package com.example.campaign_app.service;

import com.example.campaign_app.model.Campaign;
import com.example.campaign_app.model.EmeraldAccount;
import com.example.campaign_app.repository.CampaignRepository;
import com.example.campaign_app.repository.EmeraldAccountRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CampaignServiceTest {

    @Mock
    private CampaignRepository campaignRepository;

    @Mock
    private EmeraldAccountRepository emeraldAccountRepository;

    @InjectMocks
    private CampaignService campaignService;

    @Test
    void CreateCampaignAndDeductFunds() {
        Long accountId = 1L;
        EmeraldAccount account = new EmeraldAccount(accountId, BigDecimal.valueOf(1000), null);

        Campaign newCampaign = new Campaign();
        newCampaign.setCampaignFund(BigDecimal.valueOf(200));
        newCampaign.setName("Test Campaign");

        when(emeraldAccountRepository.findById(accountId)).thenReturn(Optional.of(account));
        when(campaignRepository.save(any(Campaign.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Campaign result = campaignService.createCampaign(newCampaign, accountId);

        assertEquals(BigDecimal.valueOf(800), account.getBalance());
        verify(emeraldAccountRepository, times(1)).save(account);
        verify(campaignRepository, times(1)).save(newCampaign);
    }

    @Test
    void ThrowException_IfBalanceIsInsufficient() {
        Long accountId = 1L;
        EmeraldAccount account = new EmeraldAccount(accountId, BigDecimal.valueOf(100), null);

        Campaign expensiveCampaign = new Campaign();
        expensiveCampaign.setCampaignFund(BigDecimal.valueOf(500));

        when(emeraldAccountRepository.findById(accountId)).thenReturn(Optional.of(account));

        assertThrows(RuntimeException.class, () -> {
            campaignService.createCampaign(expensiveCampaign, accountId);
        });

        assertEquals(BigDecimal.valueOf(100), account.getBalance());
        verify(campaignRepository, never()).save(any());
    }
}