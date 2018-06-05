package service;

import entity.Notebook;

import java.util.List;
import java.util.Map;

public interface NoteBookService {
    List<Map<String, Object>> listNoteBooksByUserId(String userId) throws UserNotFoundException;

    boolean deleteNotebook(String notebookId) throws NotebookNotFoundException;

    boolean addNotebook(String notebookName,String userId) throws UserNotFoundException;

    boolean updateNotebook(String notebookId, String userId, String name) throws NotebookNotFoundException,UserNotFoundException;
}
