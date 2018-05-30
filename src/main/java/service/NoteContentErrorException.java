package service;

/**
 * 这个异常是在笔记功能出问题是抛出(如title为空等)
 */
public class NoteContentErrorException extends RuntimeException {
    public NoteContentErrorException() {
    }

    public NoteContentErrorException(String message) {
        super(message);
    }

    public NoteContentErrorException(String message, Throwable cause) {
        super(message, cause);
    }

    public NoteContentErrorException(Throwable cause) {
        super(cause);
    }

    public NoteContentErrorException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
