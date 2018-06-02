package service;

import java.util.List;
import java.util.Map;

public interface NoteService {
    List<Map<String, Object>> listNotes(String notebookId) throws NotebookNotFoundException;

    List<Map<String, Object>> listAllNotes();

    boolean addNote(String notebookId, String userId, String body, String title) throws NotebookNotFoundException, UserNotFoundException;

    //这个方法是修改笔记的内容和标题
    boolean updateNote(String noteId, String body, String title) throws NotebookNotFoundException, UserNotFoundException;

    //这个方法用来把笔记放进和拿出回收站
    boolean trashNote(String noteId,String statusId) throws NoteNotFoundException;

    //这个方法用来变更笔记所在的笔记本
    boolean updateNote(String noteId,String notebookId) throws NotebookNotFoundException,NoteNotFoundException;

    //通过noteId得到note的信息
    Map<String, Object> getNoteContent(String noteId) throws NoteNotFoundException;

    //通过noteId定位到相应的笔记并且删除它
    boolean deleteNote(String noteId) throws NoteNotFoundException;
}
