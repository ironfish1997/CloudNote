import org.junit.Test;
import service.NoteBookService;

import java.util.List;
import java.util.Map;

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
}
