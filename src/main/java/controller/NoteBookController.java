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
public class NoteBookController extends AbstractController{

    @Resource
    private NoteBookService noteBookService;

    @RequestMapping("/list.do")
    @ResponseBody
    public JsonResult list(String userId){
        List<Map<String, Object>> list= noteBookService.listNoteBooksByUserId(userId);
        return new JsonResult(list);
    }


}
