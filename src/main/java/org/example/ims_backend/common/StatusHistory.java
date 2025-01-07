package org.example.ims_backend.common;

public enum StatusHistory {
    CREATE_TASK(0),
    CHANGE_PRESIDE(1),
    ADD_COORDINATOR(2),
    COMPLETE_TASK(3);
    private final int value;
    private StatusHistory(int value) {
        this.value = value;
    }
    public int getValue() {
        return value;
    }
    public static StatusHistory fromValue(int value) {
        for (StatusHistory statusHistory : StatusHistory.values()) {
            if (statusHistory.value == value) {
                return statusHistory;
            }
        }
        throw new IllegalArgumentException("Invalid value: " + value);
    }
}
