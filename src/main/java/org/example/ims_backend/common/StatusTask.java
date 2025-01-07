package org.example.ims_backend.common;

public enum StatusTask {
    NEWLY_CREATED(0),
    WAITING_FOR_PROGRESS_REPORT(1),
    REQUEST_EXTENSION(2),
    COMPLETED(3);
    private final int value;
    private StatusTask(int value) {
        this.value = value;
    }
    public int getValue() {
        return value;
    }
    public static StatusTask fromValue(int value) {
        for (StatusTask statusTask : StatusTask.values()) {
            if (statusTask.value == value) {
                return statusTask;
            }
        }
        throw new IllegalArgumentException("Invalid value: " + value);
    }
}
