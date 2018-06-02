package controller;

import entity.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import service.UserNameException;
import service.UserService;
import util.JsonResult;

import javax.annotation.Resource;

@Controller("userController")
@RequestMapping("/user")
public class UserController extends AbstractController{
    @Resource
    private UserService userService;

    @RequestMapping("/login.do")
    @ResponseBody
    public Object login(String name, String password) {
        System.out.println("请求登录");
        User user = userService.Login(name, password);
        return new JsonResult(user);
    }

    @RequestMapping("/register.do")
    @ResponseBody
    public Object register(String name,String password,String confirm,String nick){
        User user=userService.Register(name,password,nick,confirm);
        return new JsonResult(user);
    }

    @RequestMapping("/update.do")
    @ResponseBody
    public Object update(String name,String origin, String password , String confirm){
        return new JsonResult(userService.Update(name,origin,password,confirm));
    }
}
