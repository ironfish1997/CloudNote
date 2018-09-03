package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.NoteBookService;
import util.JsonResult;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Controller("noteBookController")
@RequestMapping("/notebook")
public class NoteBookController extends AbstractController {

    public NoteBookController() {

    }

    @Resource
    private NoteBookService noteBookService;

    @RequestMapping("/list.do")
    @ResponseBody
    public JsonResult list(String userId) {
        List<Map<String, Object>> list = noteBookService.listNoteBooksByUserId(userId);
        return new JsonResult(list);
    }

    @RequestMapping("/addNotebook.do")
    @ResponseBody
    public JsonResult add(String name, String userId) {
        Object isSuccess = noteBookService.addNotebook(name, userId);
        return new JsonResult(isSuccess);
    }

    @RequestMapping("/deleteNotebook.do")
    @ResponseBody
    public JsonResult delete(String notebookId) {
        Object isSuccess = noteBookService.deleteNotebook(notebookId);
        return new JsonResult(isSuccess);
    }

    @RequestMapping("/updateNotebook.do")
    @ResponseBody
    public JsonResult update(String notebookId, String userId, String name) {
        Object isSuccess = noteBookService.updateNotebook(notebookId, userId, name);
        return new JsonResult(isSuccess);
    }

}
