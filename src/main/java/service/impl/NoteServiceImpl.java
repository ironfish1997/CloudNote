package service.impl;

import dao.NoteDao;
import dao.NotebookDao;
import entity.Notebook;
import org.springframework.stereotype.Controller;
import service.NoteService;
import service.NotebookNotFoundException;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Controller("noteService")
public class NoteServiceImpl implements NoteService {
    @Resource
    private NoteDao noteDao;
    @Resource
    private NotebookDao notebookDao;

    @Override
    public List<Map<String, Object>> listNotes(String notebookId) throws NotebookNotFoundException {
        if(notebookId==null||notebookId.trim().isEmpty()){
            throw new NotebookNotFoundException("notebook的Id为空");
        }
        Notebook notebook=notebookDao.findNotebookByNotebookId(notebookId);
        if(notebook==null){
            throw new NotebookNotFoundException("找不到对应的Notebook");
        }
        return noteDao.findNotesByNoteBookId(notebookId);
    }
}
