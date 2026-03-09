package de.ait.dto;

import jakarta.validation.constraints.*;

public class DeclarationCreateRequest {

    @Min(value = 2020, message = "Year must be greater than 2020")
    @Max(value = 2025, message = "Year must be less than 2025")
    private int year;

    @NotNull(message = "Tax number must be provided")
    @NotBlank(message = "Tax number must not be blank")
    public String taxNumber;

    @Min(value = 0, message = "Income must be greater than 0")
    private  int income;

    @Size(max = 200, message = "Comment must not exceed 200 characters")
    private String comment;

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getTaxNumber() {
        return taxNumber;
    }

    public void setTaxNumber(String taxNumber) {
        this.taxNumber = taxNumber;
    }

    public int getIncome() {
        return income;
    }

    public void setIncome(int income) {
        this.income = income;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}