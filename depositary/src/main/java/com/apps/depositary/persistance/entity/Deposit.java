package com.apps.depositary.persistance.entity;

import com.apps.depositary.service.deposit.Route;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.math.MathContext;

@Entity
@Access(AccessType.FIELD)
@Table(name = "DEPOSIT")
public class Deposit extends BaseEntity{

    @Column(name = "SYMBOL")
    private String symbol;

    @Column(name = "ACCOUNT_ID")
    private String accountId;

    @Enumerated(EnumType.STRING)
    @Column(name = "ROUTE")
    private Route route;

    @Column(name = "FILL_PRICE")
    private BigDecimal fillPrice;

    @Column(name = "BLOCKED_PRICE")
    private Integer blockedPrice;

    @Column(name = "QUANTITY")
    private Integer quantity;

    @Column(name = "CLOSED")
    private boolean closed;

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public BigDecimal getFillPrice() {
        return fillPrice;
    }

    public void setFillPrice(Double fillPrice) {
        this.fillPrice = new BigDecimal(fillPrice, MathContext.DECIMAL32);
    }

    public Integer getBlockedPrice() {
        return blockedPrice;
    }

    public void setBlockedPrice(Integer blockedPrice) {
        this.blockedPrice = blockedPrice;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public boolean isClosed() {
        return closed;
    }

    public void setClosed(boolean closed) {
        this.closed = closed;
    }
}
