package com.apps.depositary.persistance.repository;


import com.apps.depositary.persistance.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {

    Account findAccountByAccountId(String accountId);
}
