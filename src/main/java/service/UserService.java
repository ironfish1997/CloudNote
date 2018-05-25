package service;

import entity.User;

/**
 * 业务层接口
 */
public interface UserService {
    /**
     * 登录功能，登录成功返回登录信息，失败则抛出异常
     * @param name
     * @param password
     * @return 登录成功就返回登录用户信息
     * @throws UserNotFoundException 用户不存在
     * @throws PasswordException 密码错误
     */
    User Login(String name, String password) throws UserNotFoundException,PasswordException;
    User Register(String name,String password,String nick,String confirm) throws UserNameException,PasswordException;

}