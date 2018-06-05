import dao.NotebookDao;
import entity.Notebook;
import org.junit.Before;
import org.junit.Test;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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

    //pass
    @Test
    public void testAddNotebook(){
        Notebook notebook=new Notebook();
        notebook.setId(UUID.randomUUID().toString());
        notebook.setUserId("c0217351-7c9b-43b1-a407-7fe1fd228532");
        notebook.setName("测试添加笔记本功能");
        Timestamp time1 = new Timestamp(System.currentTimeMillis());
        notebook.setCreateTime(time1);
        NotebookDao dao=ctx.getBean("notebookDao",NotebookDao.class);
        dao.addNotebook(notebook);
    }

    @Test
    public void testDeleteNotebook(){
        String notebookId="69626d0d-82a2-4376-8972-c7bcf79b080d";
        NotebookDao dao=ctx.getBean("notebookDao",NotebookDao.class);
        dao.deleteNotebook(notebookId);
    }

    @Test
    public void testUpdateNotebook(){
        Notebook notebook=new Notebook();
        notebook.setId("4e701af0-ae78-49c2-baa6-407904cdd69e");
        notebook.setName("软件工程改名");
        NotebookDao dao=ctx.getBean("notebookDao",NotebookDao.class);
        dao.updateNotebook(notebook);
    }
}
