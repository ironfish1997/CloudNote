import entity.User;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import service.UserService;

public class UserServiceTest extends BaseTest {

    UserService service;
    @Before
    public void init(){
        ctx=new ClassPathXmlApplicationContext(
                "conf/spring-controller.xml",
                "conf/spring-mybatis.xml",
                "conf/spring-service.xml");
        service= ctx.getBean("userService", UserService.class);
    }
    @Test
    public void testLogin() {
        String name = "demo";
        String password = "123";
        User user = service.Login(name, password);
        System.out.println(user);
    }

    @Test
    public void testRegister(){

        User user=service.Register("Andy","123","ann","123");
        System.out.println(user);
    }

    @Test
    public void testUpdate(){
        String name="liuliyong";
        String originPassword="123456";
        String password="1234567";
        String confirm="1234567";
        service.Update(name,originPassword,password,confirm);
    }
}
