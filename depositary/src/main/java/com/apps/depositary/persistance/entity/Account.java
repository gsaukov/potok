package com.apps.depositary.persistance.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Access(AccessType.FIELD)
@Table(name = "ACCOUNT")
public class Account extends BaseEntity {

    @Column(name = "ACCOUNT_ID")
    private String accountId;

    @Column(name = "BALANCE")
    private BigDecimal balance;

    @JoinColumn(name = "ACCOUNT_ID", referencedColumnName="ACCOUNT_ID")
    @OneToMany(cascade = CascadeType.DETACH, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Deposit> deposits;

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public List<Deposit> getDeposits() {
        return deposits;
    }

    public void setDeposits(List<Deposit> deposits) {
        this.deposits = deposits;
    }

}
