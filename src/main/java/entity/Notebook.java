package entity;

import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Objects;

@Component("notebook")
public class Notebook implements Serializable {
    private static final long serialVersionUID = 9087319480187192129L;
    private String id;
    private String userId;
    private String typeId;
    private String name;
    private String descr;
    private Timestamp createTime;

    public Notebook() {
    }

    public Notebook(String id, String userId, String typeId, String name, String descr, Timestamp createTime) {
        this.id = id;
        this.userId = userId;
        this.typeId = typeId;
        this.name = name;
        this.descr = descr;
        this.createTime = createTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTypeId() {
        return typeId;
    }

    public void setTypeId(String typeId) {
        this.typeId = typeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "Notebook{" + "id='" + id + '\'' + ", userId='" + userId + '\'' + ", typeId='" + typeId + '\'' + ", name='" + name + '\'' + ", descr='" + descr + '\'' + ", createTime=" + createTime + '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Notebook notebook = (Notebook) o;
        return Objects.equals(id, notebook.id);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id);
    }
}
