package dao;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("noteDao")
public interface NoteDao {
    public List<Map<String,Object>> findNotesByNoteBookId(String noteBookId);
}
