package service;

import java.util.List;
import java.util.Map;

public interface NoteService {
    public List<Map<String,Object>> listNotes(String notebookId) throws NotebookNotFoundException;
}
