package com.example.campaign_app.controller;

import com.example.campaign_app.model.EmeraldAccount;
import com.example.campaign_app.repository.EmeraldAccountRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/account")
@CrossOrigin(origins = "*")
public class EmeraldAccountController {

    private final EmeraldAccountRepository accountRepository;

    public EmeraldAccountController(EmeraldAccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }
    @GetMapping("/{id}")
    public ResponseEntity<BigDecimal> getBalance(@PathVariable Long id) {
        return accountRepository.findById(id).map(EmeraldAccount::getBalance).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}