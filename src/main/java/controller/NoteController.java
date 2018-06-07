package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.NoteService;
import util.JsonResult;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller("noteController")
@RequestMapping("/note")
public class NoteController extends AbstractController {
    @Resource
    private NoteService noteService;

    @RequestMapping("/list.do")
    @ResponseBody
    public Object list(String notebookId) {
        List<Map<String, Object>> list = noteService.listNotes(notebookId);
        return new JsonResult(list);
    }

    @RequestMapping("/listAll.do")
    @ResponseBody
    public Object listAll(){
        List<Map<String, Object>> list = noteService.listAllNotes();
        return new JsonResult(list);
    }

    @RequestMapping("/addNote.do")
    @ResponseBody
    public Object addNote(String notebookId, String userId, String title, String body) {
        return new JsonResult(noteService.addNote(notebookId, userId, body, title));
    }

    @RequestMapping("/updateNote.do")
    @ResponseBody
    public JsonResult updateNote(String noteId,String notebookId,  String title,String body) {
        return new JsonResult(noteService.updateNote(noteId,notebookId, title, body));
    }

    @RequestMapping("/moveNote.do")
    @ResponseBody
    public JsonResult moveNote(String noteId, String notebookId,String title){
        return new JsonResult(noteService.updateNote(noteId,notebookId,title));
    }

    @RequestMapping("/getNoteContent.do")
    @ResponseBody
    public JsonResult getNoteContentByNoteId(String noteId){
        return new JsonResult(noteService.getNoteContent(noteId));
    }

    @RequestMapping("/trashNote.do")
    @ResponseBody
    public JsonResult trashNote(String noteId,String statusId){
        return new JsonResult(noteService.trashNote(noteId,statusId));
    }

    @RequestMapping("/deleteNote.do")
    @ResponseBody
    public JsonResult deleteNote(String noteId){
        return new JsonResult(noteService.deleteNote(noteId));
    }
}
