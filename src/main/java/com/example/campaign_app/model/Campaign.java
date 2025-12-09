package com.example.campaign_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.util.Set;
/**
 * Entity representing a marketing campaign in the system.
 * It holds information about the campaign configuration and the association with an Emerald Account.
 */
@Entity
@Table(name = "campaign")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Campaign {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Mandatory")
    private String name;

    @ElementCollection
    @CollectionTable(name = "campaign_keywords", joinColumns = @JoinColumn(name = "campaign_id"))
    @Column(name = "keyword")
    private Set<String> keywords;

    @NotNull
    @Min(value = 1)
    private BigDecimal bidAmount;

    @NotNull
    @Min(value = 0)
    private BigDecimal campaignFund;

    @NotNull
    @Enumerated(EnumType.STRING)
    private CampaignStatus status;

    private String town;

    @NotNull
    @Min(value = 0)
    private Integer radius;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    @JsonIgnore
    private EmeraldAccount emeraldAccount;
}