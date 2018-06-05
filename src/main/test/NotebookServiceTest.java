import dao.NotebookDao;
import entity.Notebook;
import org.junit.Test;
import service.NoteBookService;
import service.NoteService;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class NotebookServiceTest extends BaseTest {
    @Test
    public void testListNoteBookById(){
        String userId="52f9b276-38ee-447f-a3aa-0d54e7a736e4";
        NoteBookService dao=ctx.getBean("noteBookService", NoteBookService.class);
        List<Map<String, Object>> list=dao.listNoteBooksByUserId(userId);
        for(Map m:list){
            System.out.println(m);
        }
    }

    @Test
    public void testAddNotebook(){
        Notebook notebook=new Notebook();
        notebook.setId(UUID.randomUUID().toString());
        notebook.setUserId("c0217351-7c9b-43b1-a407-7fe1fd228532");
        notebook.setName("测试添加笔记本功能");
        Timestamp time1 = new Timestamp(System.currentTimeMillis());
        notebook.setCreateTime(time1);
        NoteBookService service=ctx.getBean("noteBookService", NoteBookService.class);
        service.addNotebook("测试添加笔记本Service功能", "c0217351-7c9b-43b1-a407-7fe1fd228532");
    }

    /**
     * 测试变更笔记的笔记本
     */
    @Test
    public void testUpdateNote(){
        String noteId="f4594f33-06d4-47dc-87cf-c3bd20e5a23f";
        String notebookId="5c4f839b-6a2f-4b5d-9961-6be3258f3fb5";
        NoteService service=ctx.getBean("noteService", NoteService.class);
        service.updateNote(noteId,notebookId);
    }

    /**
     * 测试删除笔记本功能
     */
    @Test
    public void testDeleteNotebook(){
        String notebookId="52b7404b-1f7a-44c4-9406-e4716ff861b1";
        NoteBookService service=ctx.getBean("noteBookService",NoteBookService.class);
        service.deleteNotebook(notebookId);
    }

    /**
     * 测试修改笔记本功能
     */
    @Test
    public void testUpdateNotebook(){
        NoteBookService noteBookService=ctx.getBean("noteBookService",NoteBookService.class);
        NotebookDao notebookDao=ctx.getBean("notebookDao",NotebookDao.class);
        Notebook notebook=notebookDao.findNotebookByNotebookId("4e701af0-ae78-49c2-baa6-407904cdd69e");
        notebook.setName("编译原理Service改动");
        noteBookService.updateNotebook(notebook.getId(),notebook.getUserId(),notebook.getName());
    }
}
