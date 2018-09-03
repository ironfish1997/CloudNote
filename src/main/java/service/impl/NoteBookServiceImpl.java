package service.impl;

import dao.NotebookDao;
import dao.UserDao;
import entity.Notebook;
import entity.User;
import org.springframework.stereotype.Service;
import service.NoteBookService;
import service.NotebookNotFoundException;
import service.UserNameException;
import service.UserNotFoundException;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service("noteBookService")
public class NoteBookServiceImpl implements NoteBookService {
    public NoteBookServiceImpl() {
    }

    @Resource
    private NotebookDao notebookDao;

    @Resource
    private UserDao userDao;

    @Override
    public List<Map<String, Object>> listNoteBooksByUserId(String userId) throws UserNotFoundException {
        if (userId == null || userId.trim().isEmpty()) {
            throw new UserNotFoundException("用户id为空");
        }
        User user = userDao.findUserById(userId);
        if (user == null) {
            throw new UserNotFoundException("用户不存在");
        }
        return notebookDao.findNotebooksByUserId(userId);
    }

    @Override
    public boolean deleteNotebook(String notebookId) throws NotebookNotFoundException {
        if (notebookId == null || notebookId.trim().isEmpty()) {
            throw new NotebookNotFoundException("笔记本id为空");
        }
        Notebook notebook = notebookDao.findNotebookByNotebookId(notebookId);
        if (notebook == null) {
            throw new NotebookNotFoundException("笔记本不存在");
        }
        int i = notebookDao.deleteNotebook(notebookId);
        return i == 1;
    }

    @Override
    public boolean addNotebook(String notebookName, String userId) throws UserNotFoundException {
        //如果没有从前端拿到user的id，则抛出错误
        if (userId == null || userId.trim().isEmpty()) {
            throw new UserNotFoundException("用户id为空");
        }
        if (notebookName == null || notebookName.trim().isEmpty()) {
            throw new NotebookNotFoundException("笔记本名称为空");
        }
        User user = userDao.findUserById(userId);
        if (user == null) {
            throw new UserNotFoundException("用户不存在");
        }

        Notebook temp = notebookDao.findNotebookByName(notebookName);
        if (temp != null) {
            throw new UserNameException("笔记本名称不能重复");
        }
        Notebook notebook = new Notebook();
        notebook.setId(UUID.randomUUID().toString());
        notebook.setName(notebookName);
        notebook.setUserId(userId);
        notebook.setCreateTime(new Timestamp(System.currentTimeMillis()));
        return notebookDao.addNotebook(notebook) == 1;
    }

    /**
     * 这个方法用来修改笔记本的相关数据
     *
     * @throws NotebookNotFoundException
     * @throws UserNotFoundException
     */
    @Override
    public boolean updateNotebook(String notebookId, String userId, String name) throws NotebookNotFoundException, UserNotFoundException {
        if (userId == null || userId.trim().isEmpty()) {
            throw new UserNotFoundException("用户id为空");
        }
        if (notebookId == null || notebookId.trim().isEmpty()) {
            throw new NotebookNotFoundException("笔记本id为空");
        }
        if (name == null || name.trim().isEmpty()) {
            throw new NotebookNotFoundException("笔记本名称为空");
        }
        if (userDao.findUserById(userId) == null) {
            throw new UserNotFoundException("找不到用户");
        }
        Notebook notebook = notebookDao.findNotebookByNotebookId(notebookId);
        if (notebook == null) {
            throw new NotebookNotFoundException("找不到笔记本");
        }
        if (notebookDao.findNotebookByName(name) != null) {
            throw new UserNameException("笔记本名称不能重复");
        }
        notebook.setName(name);
        int i = notebookDao.updateNotebook(notebook);
        return i == 1;
    }
}
