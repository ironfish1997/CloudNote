import dao.NoteDao;
import org.junit.Test;

import java.util.List;
import java.util.Map;

public class NoteTest extends BaseTest {
    @Test
    public void testFindNotesByNoteBookId(){
        String notebookId="6d763ac9-dca3-42d7-a2a7-a08053095c08";
        NoteDao dao=ctx.getBean("noteDao",NoteDao.class);
        List<Map<String,Object>> noteList =dao.findNotesByNoteBookId(notebookId);
        for(Map map:noteList){
            System.out.println(map);
        }
    }
}
