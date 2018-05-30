var SUCCESS = 0;
var ERROR = 1;
$(function () {
    //网页加载以后，立即读取笔记本列表
    loadNoteBooks();
    //on()方法绑定事件可以区别事件源
    //click()方法绑定事件，无法区别事件源
    //绑定笔记本列表区域的点击事件
    $('#notebook-list').on('click', '.notebook', loadNotes);
    //当note被点击时，让该note高亮显示，并显示note内容
    $('#note-list').on('click', '.online', chooseNote);
    //当添加笔记按钮被点击时，打开添加笔记窗口
    $('#note-list').on('click', '#add_note', showAddNoteDialog);
    //当预览页面的编辑笔记按钮被按下时，转换到编辑笔记页面;
    $('#edit_note').on('click', openEditPanel);
    //当编辑页面的保存按钮被点击时，保存更改
    $('#save_note').on('click', updateNote);
    //冒泡监听
    $('#can').on('click', '.create-note', addNote);
    $('#can').on('click', '.cancel,.close', closeDialog);
});

//-------------------------显示所有笔记本的函数--------------------------------------

/***
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
        }
    });
}

/**
 * 把笔记本显示出来的li的模板
 */
var showNotebookLiTemplate =
    '<li class="online notebook">' +
    '<a class="unchecked">' +
    '<i class="fa fa-book" title="online" rel="tooltip-bottom"></i> [bookName] </a>' +
    '</li>';

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

//-----------------------有关笔记的函数-----------------------------------

/**
 * 加载当前被点击的笔记本li下的所有笔记
 */

function loadNotes() {
    var li = $(this);//当前被点击的对象li
    //给被点击的li增加选定效果
    li.parent().find('a').removeClass('checked');
    li.find('a').addClass('checked');
    var url = 'note/list.do';
    var data = {notebookId: li.data('notebookId')};
    $.getJSON(url, data, function (result) {
        if (result.state == SUCCESS) {
            var notes = result.data;
            showNotes(notes);
        } else {
            alert(result.message);
        }
    });
}

/**
 * 利用notebookId来加载笔记本下所有笔记
 * @param notebookId
 */
function loadNotesByNotebookId(notebookId){
    //找到当前被选中的笔记本li
    var url = 'note/list.do';
    var data = {notebookId: notebookId};
    $.getJSON(url, data, function (result) {
        if (result.state == SUCCESS) {
            var notes = result.data;
            showNotes(notes);
        } else {
            alert(result.message);
        }
    });
}

var noteTemplate =
    '<li class="online">' +
    '<a class="unchecked">' +
    '<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>' +
    '[notetitle]' + /* note标题*/
    '<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button> ' +
    '</a> ' +
    '<div class="note_menu" tabindex="-1">' +
    '<dl>' +
    '<dt><button type="button" class="btn btn-default btn-xs btn_move" title="移动至..."><i class="fa fa-random"></i></button></dt> ' +
    '<dt><button type="button" class="btn btn-default btn-xs btn_share" title="分享"><i class="fa fa-sitemap"></i></button></dt>' +
    '<dt><button type="button" class="btn btn-default btn-xs btn_delete" title="删除"> <i class="fa fa-times"></i></button></dt>' +
    '</dl>' +
    '</div>' +
    '</li>';

/**
 * 把笔记列表显示在屏幕上
 * @param notes
 */
function showNotes(notes) {
    //找到显示笔记本列表的ul
    var ul = $('#note-list ul');
    ul.empty();
    //遍历笔记列表，将为每个对象创建一个li元素，添加到ul中
    for (var i = 0; i < notes.length; i++) {
        var li = noteTemplate.replace('[notetitle]', notes[i].title);
        li = $(li);
        //将noteId绑定到li
        li.data('noteId', notes[i].id);
        ul.append(li);
    }
}

/**
 * 高亮显示当前选中的笔记li，并在编辑区和预览区显示笔记内容(待写)
 */
function chooseNote() {
    //得到当前被选中的li
    var li = $(this);
    li.parent().find('a').removeClass('checked');
    li.find('a').addClass('checked');
    $('#edit_note').css('display','inline');
    var noteId= li.data('noteId');
    var url='note/getNoteContent.do';
    var data={noteId:noteId};
    $.getJSON(url,data,function (result) {
        if(result.state==SUCCESS){
            var data=result.data;
            var editor=$('#myEditor').data('editor');
            $('#noput_note_body').empty();
            //把标题，body等信息填进预览页面
            $('#note_title_content').html('');
            $('#note_title_content').html(data.title);
            $('#input_note_title').attr("value", data.title);
            editor.txt.html(data.body);
            $('#noput_note_body').append(data.body);

        }
    })
}

/**
 *弹出一个添加笔记的对话框
 */
function showAddNoteDialog() {
    $('#can').load('alert/alert_note.html', function () {
        //显示遮罩
        $('.opacity_bg').show();
        //focus对话框里的输入框
        $('#input_note').focus();
    });
}

/**
 * 添加笔记
 */
function addNote() {
    var title = $('#input_note').val().trim();
    if (title == null || title == '') {
        alert("笔记标题不能为空");
        return;
    }
    var userId = getCookie('userId');
    if (userId == null || userId == '') {
        alert("userId不能为空");
        window.location.href = 'login.html';
    }
    var notebookId = $('#notebook-list').find('.checked').parent().data('notebookId');
    if (notebookId == null || notebookId == '') {
        alert("请选择笔记本");
        return;
    }
    var body = null;
    var url = "note/addNote.do";
    var data = {notebookId: notebookId, userId: userId, title: title, body: body};
    $.getJSON(url, data, function (result) {
        if (result.state == SUCCESS) {
            alert("笔记创建成功");
            $('#notebook-list').find('.checked').parent().click();
            $('.cancle').click();
            return;
        } else {
            alert(result.message);
            //把title输入框置为空
            $('#input_note').html('');
            $('.cancle').click();
            return;
        }
    });
}

/**
 *关掉添加笔记的对话框,按添加笔记对话框上的叉叉或者取消按钮时执行
 */
function closeDialog() {
    $('.opacity_bg').hide();
    $('#can').empty();
}

/**
 * 修改笔记，点击保存修改按钮执行(待完成)
 */
function updateNote(){
    //得到笔记编辑区里的标题
    var title=$('#input_note_title').val().trim();
    //得到笔记编辑区的body
    var editor=$('#myEditor').data('editor');
    var body=editor.txt.html();
    //拿到当前选定的笔记li绑定的笔记id
    var noteId=$('#note-list .checked').parent().data('noteId');
    var data={title:title,body:body,noteId:noteId};
    var url='/note/updateNote.do';
    $.getJSON(url,data,function (result) {
        if(result.state==SUCCESS){
            alert("笔记修改成功");
            //得到当前被选中的笔记本li，刷新笔记列表
            var notebookId=$('#notebook-list .checked').parent().data('notebookId');
            loadNotesByNotebookId(notebookId);
            openPreviewPanel();
            return;
        }else{
            alert(result.message);
            return;
        }
    })
}

/**
 * 这个函数用来打开预览界面并重新加载预览
 */
function openPreviewPanel() {
    $('#preview_note_panel').css('display','inline');
    $('#edit_note_panel').css('display','none');
}

/**
 * 这个函数用来打开编辑界面并加载内容
 */
function openEditPanel() {
    $('#preview_note_panel').css('display','none');
    $('#edit_note_panel').css('display','inline');
}
//---------------------------------------------------------------------------------


/***
 * 分享笔记
 */
function createShareNote() {
    $("footer div strong").text("分享成功").parent().fadeIn(100);
    setTimeout(function () {
        $("footer div").fadeOut(500);
    }, 1500);
}

/***
 * 查询回收站笔记列表
 */
function getRecycleNoteList() {
    alert("查询回收站笔记列表");
}

/***
 * 查看回收站笔记内容
 */
function getRecycleNoteDetail() {
    console.log("查看回收站笔记内容");
}

/***
 * 删除回收站笔记
 */
function deleteRecycleNote() {
    alert("删除回收站笔记");
}

/***
 * 搜索分享笔记列表
 */
function getShareNoteList() {
    alert("搜索分享笔记列表");
}

/***
 * 查询分享笔记内容
 */
function getShareNoteDetail() {
    alert("查询分享笔记内容");
}

/***
 * 收藏分享笔记
 */
function likeShareNote(shareId, dom) {
    alert("收藏分享笔记");
}

/***
 * 加载收藏笔记
 */
function getLikeNoteList(likeNoteId) {
    alert("加载收藏笔记");
}

/***
 * 查看收藏笔记内容
 */
function getLikeNoteDetail(noteId) {
    console.log("查看收藏笔记内容");
}

/***
 * 删除收藏笔记
 */
function deleteLikeNote(noteId, dom) {
    alert("删除收藏笔记");
}

/***
 * 加载本用户参加活动笔记列表
 */
function getNoteActivityList(noteBookId) {
    alert("加载本用户参加活动笔记列表");
}

/***
 * 查询参加活动的笔记内容
 */
function getActivityNoteDetail(noteId) {
    console.log("查询参加活动的笔记内容");
}