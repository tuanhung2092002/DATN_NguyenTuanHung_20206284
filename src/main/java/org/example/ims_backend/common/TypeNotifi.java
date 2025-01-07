package org.example.ims_backend.common;

public enum TypeNotifi {
    NEW_TASK(0),
    HANDOVER_PROCESS(1),
    PROCESS_REPORT(2),
    EXTENSION_REQUEST(3),
    COMPLETION_REPORT(4),
    COMPLETED_TASK(5),
    RECALL_TASK(6);
    private final int value;
    private TypeNotifi(int value) {
        this.value = value;
    }
    public int getValue() {
        return value;
    }
    public static TypeNotifi fromValue(int value) {
        for (TypeNotifi typeNotifi : TypeNotifi.values()) {
            if (typeNotifi.value == value) {
                return typeNotifi;
            }
        }
        throw new IllegalArgumentException("Invalid value: " + value);
    }
}
