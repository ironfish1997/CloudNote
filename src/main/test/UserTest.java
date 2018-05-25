import dao.UserDao;
import entity.User;
import org.apache.commons.codec.digest.DigestUtils;
import org.junit.Test;

import java.util.UUID;

public class UserTest extends BaseTest {
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
        String salt="我是刘立勇";
        String password= DigestUtils.md5Hex(salt+"123");
        String token=null;
        String nick=null;
        User user=new User(id,name,password,token,nick);
        UserDao dao=ctx.getBean("userDao",UserDao.class);
        int n=dao.addUser(user);
        System.out.println(n);
    }

}
