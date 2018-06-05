$(function () {

    //网页加载以后，立即读取笔记本列表
    loadNoteBooks();
    /**
     * 打开创建笔记本界面
     */
    $(document).on("click", "#add_notebook", function () {
        $('#can').load('./alert/alert_notebook.html', function () {
            $('#input_notebook').focus();
        });
        $('.opacity_bg').show();
    })

    //----双击,打开修改笔记本界面
    $(document).on("dblclick", "#notebook-list li", function () {
        $('#can').load('./alert/alert_rename.html', function () {
            $('#input_notebook_rename').focus();
        });
        $('.opacity_bg').show();
    });

    //修改笔记本
    $(document).on("click", '#modalBasic_4 .sure', function () {
        updateNoteBook();
    });

    //打开删除笔记本界面
    $(document).on("click", "#first_side_right .btn_delete", function () {
        $('#can').load('./alert/alert_delete_notebook.html');
        $('.opacity_bg').show();
    });

    //点击确定删除笔记本按钮时执行删除笔记本函数
    $(document).on('click', '#delete_notebook_btn', deleteNotebook);

    //点击添加笔记本确认按钮时发送请求
    $(document).on("click", "#modalBasic .btn.btn-primary.sure", addNoteBook);

});


/**
 * 把笔记本显示出来的li的模板
 */
var showNotebookLiTemplate =
    '<li class="online notebook">' +
    '<a class="unchecked">' +
    '<i class="fa fa-book" title="online" rel="tooltip-bottom"></i> [bookName] ' +
    '<button type="button" class="btn btn-default btn-xs btn_position btn_delete">' +
    '<i class="fa fa-times"></i></button>' +
    '</a>' +
    '</li>';

/**
 * 读取笔记本列表
 */
function loadNoteBooks() {
    //利用ajax从服务器获取数据
    var url = 'notebook/list.do';
    var data = {userId: getCookie('userId')};
    $.getJSON(url, data, function (result) {
        if (SUCCESS == result.state) {
            var notebooks = result.data;
            // 在showNotebooks方法里
            // 把所有得到的notebooks显示到页面notebook-list区域
            showNotebooks(notebooks);
        } else {
            alert(result.message);
            return;
        }
    });
}

/**
 * 在notebook-list区域显示笔记本列表
 */
function showNotebooks(notebooks) {
    //找到显示笔记本列表的ul
    var ul = $('#notebook-list ul');
    ul.empty();
    //遍历笔记本列表，将为每个对象创建一个li元素，添加到ul中
    for (var i = 0; i < notebooks.length; i++) {
        var li = showNotebookLiTemplate.replace('[bookName]', notebooks[i].name);
        li = $(li);
        //将notebookId绑定到li
        li.data('notebookId', notebooks[i].id);
        ul.append(li);
    }
}


/**
 * 新建笔记本
 */
function addNoteBook() {
    //获取到笔记本的名字和当前用户的id
    var notebookName = $('#input_notebook').val().trim();
    var userId = getCookie('userId');
    //如果notebookid为空，则提示并返回
    if (notebookName == null || notebookName == '') {
        alert("笔记本名称不能为空");
        return;
    }
    if (userId == null || userId == '') {
        alert("用户id不能为空");
        return;
    }
    //发送ajax请求，新建一个笔记本
    $.post(
        'notebook/addNotebook.do',
        {
            userId: userId,
            name: notebookName
        },
        function (result) {
            if (result.state == 0) {
                alert("新建笔记本成功");
                loadNoteBooks();
            } else {
                alert(result.message);
            }
        }
    )
}


/**
 *  执行笔记本的删除操作
 */
function deleteNotebook() {
    //得到选定的笔记本项的notebookId
    var notebookId = $('#first_side_right li .checked').parent().data('notebookId');
    if (notebookId == null || notebookId == '') {
        alert('笔记本id为空');
    }
    var url = 'notebook/deleteNotebook.do';
    var data = {
        notebookId: notebookId
    }
    $.post(
        url,
        data,
        function (result) {
            if (result.state == SUCCESS) {
                alert('删除笔记本成功');
                loadNoteBooks();
                //找到显示笔记列表的ul,并删除所有显示的子元素
                var ul = $('#note-list ul');
                ul.empty();
            }
            else {
                alert(result.message);
            }
        }
    )
}

/**
 * 修改笔记本名称
 */
function updateNoteBook() {
    //从修改笔记本的输入框里获取笔记本的新名字
    var name=$('#input_notebook_rename').val();
    //如果新名字为空，则弹窗警告并退出
    if(name==null||name.trim()=='') {
        alert('请输入笔记本名');
        return;
    }
    //从当前选中的笔记本li上拿到绑定的notebookId，从cookie中拿到userId
    var notebookId= $('#first_side_right li .checked').parent().data('notebookId');
    var userId=getCookie('userId');
    if(notebookId==null||notebookId.trim()==''){
        alert('未选定笔记本');
        return;
    }
    if(userId==null||userId.trim()==''){
        alert('用户未登录');
        return;
    }
    //发起ajax请求，更改笔记本的名称
    var url='notebook/updateNotebook.do';
    var data={
        notebookId:notebookId,
        userId:userId,
        name:name
    };
    $.post(
        url,
        data,
        function (result) {
            if(result.state==SUCCESS){
                alert('修改成功');
                loadNoteBooks();
                return;
            }else{
                alert(result.message);
                return;
            }
        }
    )
}

