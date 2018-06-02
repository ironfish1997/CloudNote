import dao.UserDao;
import entity.User;
import org.apache.commons.codec.digest.DigestUtils;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public class UserTest extends BaseTest {

    private String salt="abc";
    @Test
    public void testFindUserByName() {
        String name = "demo";
        UserDao dao = ctx.getBean("userDao", UserDao.class);
        User user = dao.findUserByName(name);
        System.out.println(user);
    }

    @Test
    public void testAddUser(){
        String id=UUID.randomUUID().toString();
        String name="Tom";
        String password= DigestUtils.md5Hex(salt+"123456");
        String token=null;
        String nick=null;
        User user=new User(id,name,password,token,nick);
        UserDao dao=ctx.getBean("userDao",UserDao.class);
        int n=dao.addUser(user);
        System.out.println(n);
    }

    @Test
    public void testUpdateUser(){
        User user=new User();
        user.setName("liuliyong");
        String pass="123456";
        String password= DigestUtils.md5Hex(salt+pass.trim());
        user.setPassword(password);
        UserDao dao=ctx.getBean("userDao",UserDao.class);
        int n=dao.updateUser(user);
        System.out.println(n==1);
    }

}
