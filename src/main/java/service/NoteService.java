package service;

import java.util.List;
import java.util.Map;

public interface NoteService {
    List<Map<String, Object>> listNotes(String notebookId) throws NotebookNotFoundException;

    boolean addNote(String notebookId, String userId, String body, String title) throws NotebookNotFoundException, UserNotFoundException;

    //这个方法是修改笔记的内容和标题
    boolean updateNote(String noteId, String body, String title) throws NotebookNotFoundException, UserNotFoundException;

    //通过noteId得到note的信息
    Map<String, Object> getNoteContent(String noteId) throws NoteNotFoundException;
}
