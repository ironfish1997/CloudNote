package service;

public class NotebookNotFoundException extends RuntimeException {
    public NotebookNotFoundException() {
    }

    public NotebookNotFoundException(String message) {
        super(message);
    }

    public NotebookNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotebookNotFoundException(Throwable cause) {
        super(cause);
    }

    public NotebookNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
