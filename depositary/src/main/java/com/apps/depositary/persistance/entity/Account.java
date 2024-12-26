package com.apps.depositary.persistance.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Access(AccessType.FIELD)
@Table(name = "ACCOUNT")
public class Account extends BaseEntity {

    @Column(name = "ACCOUNT_ID")
    private String accountId;

    private List<Deposit> deposits;

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }


    public List<Deposit> getDeposits() {
        return deposits;
    }

    public void setDeposits(List<Deposit> deposits) {
        this.deposits = deposits;
    }

}
