package dao;

import entity.Notebook;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("notebookDao")
public interface NotebookDao {
    List<Map<String,Object>> findNotebooksByUserId(String userId);

    Notebook findNotebookByNotebookId(String notebookId);

    Notebook findNotebookByName(String notebookName);

    int addNotebook(@Param("notebook") Notebook notebook);

    int deleteNotebook(String notebookId);

    int updateNotebook(@Param("notebook")Notebook notebook);
}
