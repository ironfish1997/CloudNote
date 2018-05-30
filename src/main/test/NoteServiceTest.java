import com.sun.corba.se.spi.ior.ObjectKey;
import dao.NoteDao;
import entity.Note;
import org.junit.Test;
import service.NoteService;

import java.util.List;
import java.util.Map;

public class NoteServiceTest extends BaseTest {

    @Test
    public void testAddNote() {
        String userId = "48595f52-b22c-4485-9244-f4004255b972";
        String notebookId = "1db556b9-d1dc-4ed9-8274-45cf0afbe859";
        String title = "测试添加笔记功能";
        String body = "测试";
        NoteService service = ctx.getBean("noteService", NoteService.class);
        service.addNote(notebookId, userId, body, title);
    }

    @Test
    public void testUpdateNote() {
        NoteDao dao = ctx.getBean("noteDao", NoteDao.class);
        NoteService service2 = ctx.getBean("noteService", NoteService.class);
        String noteId = "87dcaa0c-d0f3-43e9-9bf8-faf6b0462708";
        System.out.println(dao.findNoteByNoteId(noteId));
        String title = "hello";
        String body = "yywo";
        service2.updateNote(noteId, title, body);
        Map<String,Object> map= dao.findNoteByNoteId(noteId);
        System.out.println(map);
    }

    @Test
    public void testFindNoteByNoteId(){
        NoteDao dao = ctx.getBean("noteDao", NoteDao.class);
        String noteId = "87dcaa0c-d0f3-43e9-9bf8-faf6b0462708";
        System.out.println(dao.findNoteByNoteId(noteId));
    }

    @Test
    public void testFindNotesByNoteBookId(){
        NoteDao dao = ctx.getBean("noteDao", NoteDao.class);
        String notebookId = "1db556b9-d1dc-4ed9-8274-45cf0afbe859";
        List<Map<String, Object>> list=dao.findNotesByNoteBookId(notebookId);
        for(Map<String,Object> map:list){
            System.out.println(map);
        }
    }
}
