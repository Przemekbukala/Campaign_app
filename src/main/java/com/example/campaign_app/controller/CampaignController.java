package com.example.campaign_app.controller;

import com.example.campaign_app.model.Campaign;
import com.example.campaign_app.service.CampaignService;
import jakarta.validation.Valid; // Import do walidacji (@NotNull, @Min)
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin(origins = "*")
public class CampaignController {

    private final CampaignService campaignService;

    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    @GetMapping
    public List<Campaign> getAllCampaigns() {
        return campaignService.getAllCampaigns();
    }

    @PostMapping
    public ResponseEntity<Campaign> createCampaign(@Valid @RequestBody Campaign campaign) {
        // Not having log system.
        Long accountId = 1L;

        Campaign createdCampaign = campaignService.createCampaign(campaign, accountId);
        return new ResponseEntity<>(createdCampaign, HttpStatus.CREATED);
    }
}