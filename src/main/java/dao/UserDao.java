package dao;

import entity.User;
import org.springframework.stereotype.Repository;

@Repository("userDao")
public interface UserDao {
    User findUserByName(String name);

    int addUser(User user);

    User findUserById(String userId);
}
