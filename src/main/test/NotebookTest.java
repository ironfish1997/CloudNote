import dao.NotebookDao;
import entity.Notebook;
import org.junit.Test;

import java.util.List;
import java.util.Map;

public class NotebookTest extends BaseTest {
    @Test
    public void testFindNotebooksByUserId(){
        String userId="52f9b276-38ee-447f-a3aa-0d54e7a736e4";
        NotebookDao dao=ctx.getBean("noteBookDao", NotebookDao.class);
        List<Map<String, Object>> list=dao.findNotebooksByUserId(userId);
        for(Map map:list){
            System.out.println(map);
        }
    }

    @Test
    public void testFindNotebookByNotebookId(){
        String notebookId="5612df0f-2b3a-4a8c-8df7-e1de67b6abcd";
        NotebookDao dao=ctx.getBean("notebookDao",NotebookDao.class);
        Notebook notebook=dao.findNotebookByNotebookId(notebookId);
        System.out.println(notebook);
    }
}
