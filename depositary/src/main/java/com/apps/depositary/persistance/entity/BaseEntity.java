package com.apps.depositary.persistance.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

import static java.time.LocalDateTime.now;

@MappedSuperclass
public abstract class BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @JdbcTypeCode(java.sql.Types.VARCHAR)
    @Column(name = "UUID")
    private UUID uuid;

    @Column(name = "CREATED_AT")
    private Date timestamp;

    @Column(name = "UPDATED_AT")
    private Date updatedAt;

    @Version
    @Column(name = "VERSION")
    private Long version;

    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getVersion() {
        return version;
    }

    @PreUpdate
    private void preUpdate() {
        updatedAt = new Date();
    }

    @Override
    public boolean equals(Object o) {
        throw new IllegalArgumentException("Method 'equals' must be overridden from downstream implementation.");
    }

    @Override
    public int hashCode() {
        throw new IllegalArgumentException("Method 'hashCode' must be overridden from downstream implementation.");
    }

}

