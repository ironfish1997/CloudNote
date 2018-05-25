var SUCCESS = 0;
var ERROR = 1;
$(function () {
    //网页加载以后，立即读取笔记本列表
    loadNoteBooks();
    //on()方法绑定事件可以区别事件源
    //click()方法绑定事件，无法区别事件源
    //绑定笔记本列表区域的点击事件
    $('#notebook-list').on('click', '.notebook', loadNotes);
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

//-----------------------显示每个笔记本的笔记的函数-----------------------------------

/**
 * 加载当前被点击的笔记本li下的所有笔记
 */

function loadNotes() {
    var li = $(this);//当前被点击的对象li
    var url = 'note/list.do';
    var data = {notebookId: li.data('notebookId')};
    console.log(data);
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
    '<a class="checked">' +
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


/***
 * 查询普通笔记内容
 */
function getNoteDetail() {
    console.log("查询普通笔记内容");
}

/***
 * 创建普通笔记
 */
function createNormalNote() {
    alert("创建普通笔记");
}

/***
 * 加载普通笔记
 */
function getNormalNoteList() {
    console.log("加载普通笔记");
}

/***
 * 更新普通笔记
 */
function updateNormalNote() {
    alert("更新普通笔记");
}

/***
 * 删除普通笔记
 */
function deleteNormalNote() {
    alert("删除普通笔记");
}

/***
 * 移动笔记
 */
function moveNote() {
    alert("移动笔记");
}

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