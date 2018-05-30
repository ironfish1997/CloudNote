package entity;

import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Objects;

@Component("user")
public class User implements Serializable {
    private static final long serialVersionUID = -8228569662628197300L;
    private String id=null;
    private String name=null;
    private String password=null;
    private String token=null;
    private String nick=null;

    public User(String id, String name, String password, String token, String nick) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.token = token;
        this.nick = nick;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id);
    }

    public User() {
        super();

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNick() {
        return nick;
    }

    public void setNick(String nick) {
        this.nick = nick;
    }

    @Override
    public String toString() {
        return "User{" + "id='" + id + '\'' + ", name='" + name + '\'' + ", password='" + password + '\'' + ", token='" + token + '\'' + ", nick='" + nick + '\'' + '}';
    }
}
