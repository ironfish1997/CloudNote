package service;

import java.util.List;
import java.util.Map;

public interface NoteBookService {
    List<Map<String, Object>> listNoteBooksByUserId(String userId) throws UserNotFoundException;
}
