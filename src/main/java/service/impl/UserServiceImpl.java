package service.impl;

import dao.UserDao;
import entity.User;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import service.PasswordException;
import service.UserNameException;
import service.UserNotFoundException;
import service.UserService;

import javax.annotation.Resource;
import java.util.UUID;

@Service("userService")
public class UserServiceImpl implements UserService {
    @Resource
    UserDao userDao;

    @Value("#{db.salt}")
    private String salt;

    @Override
    public User Login(String name, String password) throws UserNotFoundException, PasswordException {
        if (name == null || name.trim().isEmpty()) {
            throw new UserNotFoundException("用户名为空");
        }
        if (password == null || password.trim().isEmpty()) {
            throw new PasswordException("密码为空");
        }
        password = DigestUtils.md5Hex(salt + password.trim());
        User user = userDao.findUserByName(name.trim());

        if (user == null) {
            throw new UserNotFoundException("此用户不存在");
        } else if (!user.getPassword().equals(password.trim())) {
            throw new PasswordException("密码错误");
        }
        return user;
    }

    @Override
    public User Register(String name, String password, String nick, String confirm) throws UserNameException, PasswordException {
        //检查name，不能和数据库中的重复
        if (name == null || name.trim().isEmpty()) {
            throw new UserNameException("用户名不能为空");
        }
        User check = userDao.findUserByName(name);
        if (check != null) {
            throw new UserNameException("用户名已被注册");
        }
        //检查密码
        if (password == null || password.trim().isEmpty()) {
            throw new PasswordException("密码不能为空");
        }
        if (!password.equals(confirm)) {
            throw new PasswordException("两次密码输入不一样");
        }
        //检查nick
        if (nick == null || nick.trim().isEmpty()) {
            nick = name;
        }

        String id = UUID.randomUUID().toString();
        String token = null;
        String password2 = DigestUtils.md5Hex(salt + password.trim());
        User user = new User(id, name, password2, token, nick);
        int n = userDao.addUser(user);
        if (n != 1) {
            throw new RuntimeException("添加失败");
        }
        return user;
    }

    @Override
    public boolean Update(String name, String originPassword,String password, String confirm) throws UserNotFoundException, PasswordException {
        //检查用户名，密码，确认密码是否格式正确
        if(name==null||name.trim().isEmpty()){
            throw new UserNotFoundException("用户id为空");
        }
        if(password==null||password.trim().isEmpty()){
            throw new PasswordException("密码为空");
        }
        String passwordConf=confirm.trim();
        if(confirm==null||!(passwordConf.equals(password.trim()))){
            throw new PasswordException("确认密码不一致");
        }
        User user=Login(name,originPassword);
        //数据库里没有这个账号就报错
        if(user==null){
            throw new UserNotFoundException("账号不存在");
        }
        String password2 = DigestUtils.md5Hex(salt + password.trim());
        user.setPassword(password2);
        int n=userDao.updateUser(user);
        return n==1;
    }

}
