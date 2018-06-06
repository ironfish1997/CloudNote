package dao;

import entity.Note;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("noteDao")
public interface NoteDao {
    List<Map<String, Object>> findNotesByNoteBookId(String noteBookId);

    Map<String, Object> findNoteByNoteId(String noteId);

    List<Map<String, Object>> findAllNotes();

    Note findNoteByTitle(String title);

    int addNote(@Param("note") Note note);

    int updateNote(@Param("note") Note note);

    int deleteNote(String noteId);

}
