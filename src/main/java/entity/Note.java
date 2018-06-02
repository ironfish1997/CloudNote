package entity;

import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Objects;

@Component("note")
public class Note implements Serializable {
    private static final long serialVersionUID = -4692662740283223082L;
    private String id=null;
    private String notebookId=null;
    private String userId=null;
    private String statusId=null; //normal为正常，delete为被删除
    private String typeId=null;
    private String title=null;
    private String body=null;
    private Long createTime=null;
    private Long modifyTime=null;

    //有参构造器
    public Note(String id, String notebookId, String userId, String statusId, String typeId, String title, String body, Long createTime, Long modifyTime) {
        this.id = id;
        this.notebookId = notebookId;
        this.userId = userId;
        this.statusId = statusId;
        this.typeId = typeId;
        this.title = title;
        this.body = body;
        this.createTime = createTime;
        this.modifyTime = modifyTime;
    }

    //创建无参构造器
    public Note() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Note note = (Note) o;
        return Objects.equals(id, note.id);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Note{" + "id='" + id + '\'' + ", notebookId='" + notebookId + '\'' + ", userId='" + userId + '\'' + ", statusId='" + statusId + '\'' + ", typeId='" + typeId + '\'' + ", title='" + title + '\'' + ", body='" + body + '\'' + ", createTime=" + createTime + ", modifyTime=" + modifyTime + '}';
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNotebookId() {
        return notebookId;
    }

    public void setNotebookId(String notebookId) {
        this.notebookId = notebookId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getStatusId() {
        return statusId;
    }

    public void setStatusId(String statusId) {
        this.statusId = statusId;
    }

    public String getTypeId() {
        return typeId;
    }

    public void setTypeId(String typeId) {
        this.typeId = typeId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }

    public Long getModifyTime() {
        return modifyTime;
    }

    public void setModifyTime(Long modifyTime) {
        this.modifyTime = modifyTime;
    }
}
