package org.example.ims_backend.common;

public enum TypeReport {
    REQUEST_PROGRESS_REPORT(0),
    PROGRESS_REPORT(1),
    COMPLETE_REPORT(2),
    REQUERT_EXTENSION(3);
    private final int value;
    private TypeReport(int value) {
        this.value = value;
    }
    public int getValue() {
        return value;
    }
    public static TypeReport fromValue(int value) {
        for (TypeReport type : TypeReport.values()) {
            if (type.value == value) {
                return type;
            }
        }
        throw new IllegalArgumentException("Invalid value: " + value);
    }
}
