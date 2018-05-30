package service.impl;

import dao.NoteDao;
import dao.NotebookDao;
import entity.Note;
import entity.Notebook;
import org.springframework.stereotype.Controller;
import service.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller("noteService")
public class NoteServiceImpl implements NoteService {
    @Resource
    private NoteDao noteDao;
    @Resource
    private NotebookDao notebookDao;

    /**
     * 根据笔记本的id查询所有笔记
     *
     * @param notebookId
     * @return
     * @throws NotebookNotFoundException
     */
    @Override
    public List<Map<String, Object>> listNotes(String notebookId) throws NotebookNotFoundException {
        if (notebookId == null || notebookId.trim().isEmpty()) {
            throw new NotebookNotFoundException("notebook的Id为空");
        }
        Notebook notebook = notebookDao.findNotebookByNotebookId(notebookId);
        if (notebook == null) {
            throw new NotebookNotFoundException("找不到对应的Notebook");
        }
        return noteDao.findNotesByNoteBookId(notebookId);
    }

    /**
     * 根据笔记id查询笔记详细内容
     * @param noteId
     * @return
     * @throws NoteNotFoundException
     */
    @Override
    public Map<String, Object> getNoteContent(String noteId) throws NoteNotFoundException {
        if(noteId==null||noteId.trim().isEmpty()){
            throw new NoteNotFoundException("noteId不能为空");
        }
        return noteDao.findNoteByNoteId(noteId);
    }


    /**
     * 新增笔记
     *
     * @param notebookId
     * @param userId
     * @param body
     * @param title
     * @return
     * @throws NotebookNotFoundException
     * @throws UserNotFoundException
     */
    @Override
    public boolean addNote(String notebookId, String userId, String body, String title) throws NotebookNotFoundException, UserNotFoundException {
        if (notebookId == null || notebookId.trim().isEmpty()) {
            throw new NotebookNotFoundException("notebookId为空");
        }
        if (userId == null || userId.trim().isEmpty()) {
            throw new UserNotFoundException("userId为空");
        }
        if (title == null || title.trim().isEmpty()) {
            throw new NoteContentErrorException("title为空");
        }
        //初始化一个note对象，然后映射到数据库表里
        Note note = new Note();
        String id = UUID.randomUUID().toString();
        Long createTime = System.currentTimeMillis();
        note.setId(id);
        note.setBody(body);
        note.setNotebookId(notebookId);
        note.setStatusId(null);
        note.setTypeId(null);
        note.setTitle(title);
        note.setUserId(userId);
        note.setCreateTime(createTime);
        int n=noteDao.addNote(note);
        return n==1;
    }

    /**
     * 更新笔记，修改笔记内容
     * @param body
     * @param title
     * @return
     * @throws NotebookNotFoundException
     * @throws UserNotFoundException
     */
    @Override
    public boolean updateNote(String noteId,String title, String body) throws NotebookNotFoundException, UserNotFoundException {
        if(noteId==null||noteId.trim().isEmpty()){
            throw new NotebookNotFoundException("noteId为空");
        }
        //返回的时查询到的note的信息
        Map<String,Object> map=noteDao.findNoteByNoteId(noteId);
        if(map==null||map.isEmpty()){
            throw new NoteNotFoundException("没有对应的笔记");
        }
        if(title==null||title.trim().isEmpty()){
            throw new NoteEditException("标题不能为空");
        }
        Note noteUpdated =new Note();
        noteUpdated.setId(noteId);
        //如果从页面获取的title和原来的title不一样的话就更新数据库中的title
        if(!title.equals(map.get("title"))){
            noteUpdated.setTitle(title);
        }
        //如果从页面获取的body和原来的body不一样的话就更新数据库中的body
        if(body!=null&&!body.equals(map.get("body"))){
            noteUpdated.setBody(body);
        }
        //设置最后修改时间
        Long modifyTime=System.currentTimeMillis();
        noteUpdated.setModifyTime(modifyTime);
        int n=noteDao.updateNote(noteUpdated);
        return n==1;
    }
}
