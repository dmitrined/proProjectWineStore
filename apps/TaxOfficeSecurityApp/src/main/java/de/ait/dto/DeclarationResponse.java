package de.ait.dto;

public class DeclarationResponse {

    private long id;
    private String createdBy;
    private int year;
    private long income;
    private String comment;

    public DeclarationResponse(long id, String createdBy, int year, long income, String comment) {
        this.id = id;
        this.createdBy = createdBy;
        this.year = year;
        this.income = income;
        this.comment = comment;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public long getIncome() {
        return income;
    }

    public void setIncome(long income) {
        this.income = income;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}