package service.impl;

import dao.NotebookDao;
import dao.UserDao;
import entity.User;
import org.springframework.stereotype.Service;
import service.NoteBookService;
import service.UserNotFoundException;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("noteBookService")
public class NoteBookServiceImpl implements NoteBookService {

    @Resource
    private NotebookDao notebookDao;
    @Resource
    private UserDao dao;

    @Override
    public List<Map<String, Object>> listNoteBooksByUserId(String userId) throws UserNotFoundException {
        if(userId==null||userId.trim().isEmpty()){
            throw new UserNotFoundException("用户id为空");
        }
        User user=dao.findUserById(userId);
        if(user==null){
            throw new UserNotFoundException("用户不存在");
        }
        return notebookDao.findNotebooksByUserId(userId);
    }
}
