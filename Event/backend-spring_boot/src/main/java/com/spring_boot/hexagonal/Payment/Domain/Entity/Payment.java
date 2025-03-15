package com.spring_boot.hexagonal.Payment.Domain.Entity;

import java.time.LocalDateTime;

public class Payment {
    private String transactionId;
    private Double amount;
    private LocalDateTime date;
    private String status;
    private String method; // "stripe" o "paypal"

    public Payment() { }

    public Payment(String transactionId, Double amount, LocalDateTime date, String status, String method) {
        this.transactionId = transactionId;
        this.amount = amount;
        this.date = date;
        this.status = status;
        this.method = method;
    }

    // Getters y setters
    public String getTransactionId() {
        return transactionId;
    }
    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
    public Double getAmount() {
        return amount;
    }
    public void setAmount(Double amount) {
        this.amount = amount;
    }
    public LocalDateTime getDate() {
        return date;
    }
    public void setDate(LocalDateTime date) {
        this.date = date;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getMethod() {
        return method;
    }
    public void setMethod(String method) {
        this.method = method;
    }
}