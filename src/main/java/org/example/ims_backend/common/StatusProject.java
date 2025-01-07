package org.example.ims_backend.common;

public enum StatusProject {
    NEW_CREATED (0),
    PROCESSING(1),
    PENDING_REPORT(2),
    EXPIRED(3),
    RENEWAL_REQUESTED(4),
    COMPLETED(5);
    private final int value;
    private  StatusProject(int value) {
        this.value = value;
    }
    public int getValue() {
        return value;
    }
    public static StatusProject fromValue(int value) {
        for (StatusProject statusProject : StatusProject.values()) {
            if (statusProject.value == value) {
                return statusProject;
            }
        }
        throw new IllegalArgumentException("Invalid value: " + value);
    }
}
