package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.NoteService;
import util.JsonResult;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Controller("noteController")
@RequestMapping("/note")
public class NoteController extends AbstractController {
    @Resource
    private NoteService noteService;

    @RequestMapping("/list.do")
    @ResponseBody
    public JsonResult list(String notebookId){
        List<Map<String,Object>> list=noteService.listNotes(notebookId);
        return new JsonResult(list);
    }
}
