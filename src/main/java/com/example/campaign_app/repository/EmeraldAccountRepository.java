package com.example.campaign_app.repository;

import com.example.campaign_app.model.EmeraldAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmeraldAccountRepository extends JpaRepository<EmeraldAccount, Long> {
}