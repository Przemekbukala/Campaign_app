package com.example.campaign_app.service;

import com.example.campaign_app.model.Campaign;
import com.example.campaign_app.model.EmeraldAccount;
import com.example.campaign_app.repository.CampaignRepository;
import com.example.campaign_app.repository.EmeraldAccountRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final EmeraldAccountRepository accountRepository;

    public CampaignService(CampaignRepository campaignRepository, EmeraldAccountRepository accountRepository) {
        this.campaignRepository = campaignRepository;
        this.accountRepository = accountRepository;
    }

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    @Transactional
    public Campaign createCampaign(Campaign campaign, Long accountId) {
        EmeraldAccount account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        BigDecimal campaignCost = campaign.getCampaignFund();
        if (account.getBalance().compareTo(campaignCost) < 0) {
            throw new RuntimeException("Not enough funds in account.");
        }

        account.setBalance(account.getBalance().subtract(campaignCost));
        accountRepository.save(account);

        campaign.setEmeraldAccount(account);
        return campaignRepository.save(campaign);
    }


    public void deleteCampaign(Long id) {
        campaignRepository.deleteById(id);
    }


}