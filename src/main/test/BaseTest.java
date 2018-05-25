import org.junit.After;
import org.junit.Before;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public abstract class BaseTest {
    AbstractApplicationContext ctx;

    @Before
    public void init(){
        ctx=new ClassPathXmlApplicationContext(
                "conf/spring-controller.xml",
                "conf/spring-mybatis.xml",
                "conf/spring-service.xml");
    }

    @After
    public void close(){
        ctx.close();
    }
}
