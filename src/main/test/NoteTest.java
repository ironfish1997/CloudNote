import dao.NoteDao;
import entity.Note;
import org.junit.Test;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public class NoteTest extends BaseTest {

    @Test
    public void testFindNotesByNoteBookId() {
        String notebookId = "6d763ac9-dca3-42d7-a2a7-a08053095c08";
        NoteDao dao=ctx.getBean("noteDao",NoteDao.class);
        List<Map<String, Object>> noteList = dao.findNotesByNoteBookId(notebookId);
        for (Map map : noteList) {
            System.out.println(map);
        }
    }

    //pass
    @Test
    public void testAddNote() {
        String id = UUID.randomUUID().toString();
        String userId = "48595f52-b22c-4485-9244-f4004255b972";
        String notebookId = "1db556b9-d1dc-4ed9-8274-45cf0afbe859";
        String title = "测试添加笔记功能";
        String body = "测试";
        Long createTime = System.currentTimeMillis();
        Long modifyTime = System.currentTimeMillis();
        Note note = new Note(id, notebookId, userId, null, null, title, body, createTime, modifyTime);
        NoteDao dao=ctx.getBean("noteDao",NoteDao.class);
        int i = dao.addNote(note);
        if (i == 1) {
            System.out.println("添加笔记成功");
        }
    }

    //pass
    @Test
    public void testUpdateNote() {
        Note note = new Note();
        note.setId("87dcaa0c-d0f3-43e9-9bf8-faf6b0462708");
        note.setBody("123HelloSSM22");
        note.setModifyTime(System.currentTimeMillis());
        NoteDao dao=ctx.getBean("noteDao",NoteDao.class);
        dao.updateNote(note);
    }

    //pass
    @Test
    public void testFindNoteByNoteId() {
        String noteId = "87dcaa0c-d0f3-43e9-9bf8-faf6b0462708";
        NoteDao dao=ctx.getBean("noteDao",NoteDao.class);
        System.out.println(dao.findNoteByNoteId(noteId));
    }
}
