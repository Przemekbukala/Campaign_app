package com.example.campaign_app.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "emerald_account")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmeraldAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private BigDecimal balance;

    @OneToMany(mappedBy = "emeraldAccount", cascade = CascadeType.ALL)
    private List<Campaign> campaigns;
}