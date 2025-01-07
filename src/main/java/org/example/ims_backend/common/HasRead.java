package org.example.ims_backend.common;

public enum HasRead {
    NOT_VIEWED(0),
    VIEWED(1);
    private final int value;
    private HasRead(int value) {
        this.value = value;
    }
    public int getValue() {
        return value;
    }
    public static HasRead fromValue(int value) {
        for (HasRead hasRead : HasRead.values()) {
            if (hasRead.value == value) {
                return hasRead;
            }
        }
        throw new IllegalArgumentException("Invalid value: " + value);
    }
}
