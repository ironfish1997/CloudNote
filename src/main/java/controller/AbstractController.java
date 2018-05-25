package controller;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import service.UserNameException;
import util.JsonResult;

public abstract class AbstractController {

    /**
     * 其他控制器出异常，执行该方法
     * @param e
     * @return
     */
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public Object handleException(Exception e){
        e.printStackTrace();
        return new JsonResult(e);
    }
}
