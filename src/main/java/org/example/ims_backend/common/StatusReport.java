package org.example.ims_backend.common;

public enum StatusReport {
    PENDING_APPROVAL(0),
    APPROVED(1),
    NOT_APPROVED(2);
    private final int value;
    private StatusReport(int value) {
        this.value = value;
    }
    public int getValue() {
        return value;
    }
    public static StatusReport fromValue(int value) {
        for (StatusReport statusReport : StatusReport.values()) {
            if (statusReport.value == value) {
                return statusReport;
            }
        }
        throw new IllegalArgumentException("Invalid value: " + value);
    }

}
