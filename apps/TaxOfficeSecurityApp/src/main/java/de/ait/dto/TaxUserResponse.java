package de.ait.dto;

import java.util.Set;

public class TaxUserResponse {
    private Long id;
    private String username;
    private Set<String> role;
    private String taxNumber;
    private String fullName;

    public TaxUserResponse(Long id, String username, Set<String> role, String taxNumber, String fullName) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.taxNumber = taxNumber;
        this.fullName = fullName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<String> getRole() {
        return role;
    }

    public void setRole(Set<String> role) {
        this.role = role;
    }

    public String getTaxNumber() {
        return taxNumber;
    }

    public void setTaxNumber(String taxNumber) {
        this.taxNumber = taxNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
}