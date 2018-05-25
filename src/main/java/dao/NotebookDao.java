package dao;

import entity.Notebook;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("notebookDao")
public interface NotebookDao {
    List<Map<String,Object>> findNotebooksByUserId(String userId);

    Notebook findNotebookByNotebookId(String notebookId);
}
