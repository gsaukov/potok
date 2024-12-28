package com.apps.depositary.controller;

import com.apps.depositary.persistance.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AccountController {

    @Autowired
    AccountRepository accountRepository;

    @ResponseBody
    @GetMapping({"/v1/depositary/account/{accountId}"})
    public Object getAccount( @PathVariable("accountId") String accountId) {
        return accountRepository.findAccountByAccountId(accountId);
    }
}
