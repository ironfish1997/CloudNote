package dao;

import entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository("userDao")
public interface UserDao {
    User findUserByName(String name);

    int addUser(User user);

    User findUserById(String userId);

    int updateUser(@Param("user") User user);
}
