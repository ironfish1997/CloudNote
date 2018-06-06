/**
 * 需要解决的问题，笔记本不能重名，同一个笔记本里的笔记不能重名
 * @type {number}
 */

var SUCCESS = 0;
var ERROR = 1;
$(function () {

    //on()方法绑定事件可以区别事件源
    //click()方法绑定事件，无法区别事件源

    //绑定笔记本列表区域的点击事件
    $('#notebook-list').on('click', '.notebook', loadNotes);

    //当note被点击时，让该note高亮显示，并显示note内容
    $('#note-list').on('click', '.online', chooseNote);

    //当垃圾箱里的note被点击时，让该note高亮显示，并显示note内容
    $('#trash-bin').on('click', '.disable', chooseNote);

    //当添加笔记按钮被点击时，打开添加笔记窗口
    $('#note-list').on('click', '#add_note', showAddNoteDialog);

    //当预览页面的编辑笔记按钮被按下时，转换到编辑笔记页面
    $('#edit_note').on('click', openEditPanel);

    //当编辑页面的保存按钮被点击时，保存更改
    $('#save_note').on('click', updateNote);

    //点击按钮打开笔记的下拉列表
    $('#note-list').on('click', ".btn_slide_down", handleNoteBottom);

    //----打开移动笔记界面
    $(document).on("click", "#second_side_right .btn_move", getNotebookListInSelect);

    //确认移动笔记
    $(document).on('click', '#move_note_dialog .sure', moveNote);

    //打开删除笔记界面
    $(document).on("click", "#second_side_right .btn_delete", function () {
        $('#can').load('./alert/alert_delete_note.html');
        $('.opacity_bg').show();
    });

    //按确认键把笔记放进垃圾箱
    $(document).on('click', '#delete_note_dialog .sure', trashNote);

    //冒泡监听,当#candiv里面装弹窗之后，监听确定键和取消键
    $('#can').on('click', '.create-note', addNote);
    $('#can').on('click', '.cancel,.close', closeDialog);

});

//------------------------------html模板------------------------------------------------------

/**
 * 笔记列表的模板
 * @type {string}
 */
var noteTemplate =
    '<li class="online">' +
    '<a class="unchecked">' +
    '<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>' +
    '[notetitle]' + /* note标题*/
    '<button type="button" class="btn btn-default btn-xs btn_position btn_slide_down"><i class="fa fa-chevron-down"></i></button> ' +
    '</a> ' +
    '<div class="note_menu" tabindex="-1" onmouseleave="hideNoteMenu()">' +
    '<dl>' +
    '<dt><button type="button" class="btn btn-default btn-xs btn_move" title="移动至..."><i class="fa fa-random"></i></button></dt> ' +
    '<dt><button type="button" class="btn btn-default btn-xs btn_delete" title="删除"> <i class="fa fa-times"></i></button></dt>' +
    '</dl>' +
    '</div>' +
    '</li>';

/**
 * 回收站列表模板
 */
var trashTemplate =
    '<li class="disable">' +
    '<a>' +
    '<i class="fa fa-file-text-o" title="online" rel="tooltip-bottom"></i>' +
    '[notetitle]' +
    '<button type="button" class="btn btn-default btn-xs btn_position btn_delete">' +
    '<i class="fa fa-times"></i>' +
    '</button>' +
    '<button type="button" class="btn btn-default btn-xs btn_position_2 btn_replay">' +
    '<i class="fa fa-reply"></i>' +
    '</button>' +
    '</a>' +
    '</li>';

//-----------------------有关笔记的函数-----------------------------------

/**
 * 加载当前被点击的笔记本li下的所有未删除笔记
 */

function loadNotes() {
    //清除掉预览里面的内容
    $('#noput_note_body').empty();
    $('#note_title_content').html('').html('笔记内容');
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
function loadNotesByNotebookId(notebookId) {
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

/**
 * 把笔记列表显示在屏幕上
 * @param notes
 */

function showNotes(notes) {
    //把垃圾箱列表隐藏
    $('#note-list').show();
    $('#trash-bin').hide();
    //找到显示笔记本列表的ul
    var ul = $('#note-list ul');
    ul.empty();
    //找到垃圾箱的ul
    var trash_ul = $('#trash-bin ul');
    trash_ul.empty();
    //遍历笔记列表，将为每个对象创建一个li元素，添加到ul中
    for (var i = 0; i < notes.length; i++) {

        var li = noteTemplate.replace('[notetitle]', notes[i].title);
        li = $(li);
        //将noteId绑定到li
        li.data('noteId', notes[i].id);
        //如果标志位是normal证明这个笔记状态正常
        if (notes[i].statusId == 'normal') {
            ul.append(li);
        }
        //如果标志位是delete证明是垃圾箱里的
        if (notes[i].statusId == 'delete') {
            trash_ul.append(li);
        }
    }
}

/**
 * 在垃圾箱显示所有被删除的笔记
 * @param notes
 */
function showTrashNotes() {
    var url = 'note/listAll.do';
    var data = {};
    var notes = {};
    $('#edit_note').hide();
    $.getJSON(url, data, function (result) {
        if (result.state == SUCCESS) {
            notes = result.data;
            //把垃圾箱列表显示出来
            $('#note-list').hide();
            $('#trash-bin').show();
            //找到显示列表的ul
            var ul = $('#trash-bin ul');
            ul.empty();
            //遍历笔记列表，将为每个对象创建一个li元素，添加到ul中
            for (var i = 0; i < notes.length; i++) {

                var li = trashTemplate.replace('[notetitle]', notes[i].title);
                li = $(li);
                //将noteId绑定到li
                li.data('noteId', notes[i].id);
                //如果标志位是delete证明这个笔记应该显示在垃圾箱
                if (notes[i].statusId == 'delete') {
                    ul.append(li);
                }
            }
        } else {
            alert(result.message);
        }
    });
}

/**
 * 高亮显示当前选中的笔记li，并在编辑区和预览区显示笔记内容
 */
function chooseNote() {
    //得到当前被选中的li
    var li = $(this);
    li.parent().find('a').removeClass('checked');
    li.find('a').addClass('checked');
    $('#edit_note').css('display', 'inline');
    var noteId = li.data('noteId');
    var url = 'note/getNoteContent.do';
    var data = {noteId: noteId};
    //如果当前是在垃圾箱页面，就把编辑按钮隐藏
    if(li.hasClass('disable')){
        $('#edit_note').hide();
    }
    $.getJSON(url, data, function (result) {
        if (result.state == SUCCESS) {
            var data = result.data;
            var editor = $('#myEditor').data('editor');
            $('#noput_note_body').empty();
            $('#noput_note_body').append(data.body);
            //把标题，body等信息填进预览页面
            $('#note_title_content').html('');
            $('#note_title_content').html(data.title);
            $('#input_note_title').attr("value", data.title);
            editor.txt.html(data.body);

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
        } else {
            alert(result.message);
            //把title输入框置为空
            $('#input_note').html('');
            $('.cancle').click();
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
 * 修改笔记，点击保存修改按钮执行
 */
function updateNote() {
    //得到笔记编辑区里的标题
    var title = $('#input_note_title').val().trim();
    //得到笔记编辑区的body
    var editor = $('#myEditor').data('editor');
    var body = editor.txt.html();
    //拿到当前选定的笔记li绑定的笔记id
    var noteId = $('#note-list .checked').parent().data('noteId');
    if(noteId==null){
        noteId = $('#trash-bin .checked').parent().data('noteId');
    }
    var data = {title: title, body: body, noteId: noteId};
    var url = '/note/updateNote.do';
    $.getJSON(url, data, function (result) {
        if (result.state == SUCCESS) {
            alert("笔记修改成功");
            //得到当前被选中的笔记本li，刷新笔记列表
            var notebookId = $('#notebook-list .checked').parent().data('notebookId');
            loadNotesByNotebookId(notebookId);
            //清除掉预览里面的内容
            $('#noput_note_body').empty();
            $('#note_title_content').html('').html('笔记内容');
            openPreviewPanel();
        } else {
            alert(result.message);
        }
    })
}

/**
 * 点击笔记下拉按钮,打开选项下拉列表
 */
function handleNoteBottom() {
    //找到当前点击的按钮
    var btn = $(this);
    //如果当前是被选中的笔记项，就弹出菜单
    var noteItem = btn.parent('.checked').next();
    noteItem.toggle();
    //阻止点击事件继续向上冒泡
    return false;

}

/**
 * 这个函数用来打开预览界面并重新加载预览
 */
function openPreviewPanel() {
    $('#preview_note_panel').css('display', 'inline');
    $('#edit_note_panel').css('display', 'none');
}

/**
 * 这个函数用来打开编辑界面并加载内容
 */
function openEditPanel() {
    $('#preview_note_panel').css('display', 'none');
    $('#edit_note_panel').css('display', 'inline');
}

/**
 * 隐藏所有下拉菜单（待完成）
 */
function hideNoteMenu() {
    //隐藏所有的下拉笔记菜单
    $('.note_menu').hide();
}


/**
 * 显示移动笔记页面，并加载所有笔记本列表以供移动
 */
function getNotebookListInSelect() {
    $('#can').load('./alert/alert_move.html', function () {
        // 获取笔记本列表
        setNoteBookToSelect();
        //让光标保持在选项框里
        $('#moveSelect').focus();
    });
    $('.opacity_bg').show();
}

/**
 * 在移动笔记界面加载所有可供移入笔记本列表,从数据库加载笔记本数据
 */

function setNoteBookToSelect() {
    var userId = getCookie('userId');
    if (userId == null || userId == '') {
        alert("userId不能为空");
        return;
    }
    var url = '/notebook/list.do';
    var data = {
        userId: userId
    }
    $.getJSON(url, data, function (result) {
        if (SUCCESS == result.state) {
            var notebooks = result.data;
            //在showMoveSelector函数里把所有拿到的笔记本名称显示出来
            showMoveSelector(notebooks);
        }
        else {
            alert(result.message);
        }
    });
}

/**
 * 显示所有可供移动选择的笔记本选项
 * @param notebooks
 */
function showMoveSelector(notebooks) {
    //定位到select下拉框
    var select = $('#moveSelect');
    //清空所有下拉框选项
    select.empty();
    var optionTemplate = '<option>[value]</option>';
    for (var i = 0; i < notebooks.length; i++) {
        var option = optionTemplate.replace('[value]', notebooks[i].name);
        option = $(option);
        //将notebookId绑定到相应的选项上
        option.data('notebookId', notebooks[i].id);
        //把生成的选项加到selector下
        select.append(option);
    }
}

/**
 * 移动笔记
 */

function moveNote() {
    //拿到当前选中项
    var option = $('#moveSelect option:selected');
    var notebookId = option.data('notebookId');
    var noteLi = $('#note-show-ul .online .checked').parent();
    var noteId = noteLi.data('noteId');
    //如果拿到的notebookId为空则提示
    if (noteId == null || notebookId == '') {
        alert('笔记id为空');
        return;
    }
    var url = '/note/moveNote.do';
    var data = {
        notebookId: notebookId,
        noteId: noteId
    };
    $.post(
        url,
        data,
        function (result) {
            if (result.state == SUCCESS) {
                alert('移动笔记成功');
                //触发一次笔记本点击，重新加载笔记
                $('#first_side_right .checked').parent().click();
            } else {
                alert(result.message);
            }
        }
    )
}

/**
 * 把笔记的标志位从normal改为delete，把笔记放进垃圾箱
 */
function trashNote() {
    //从当前选中的笔记li上拿到绑定的noteId
    var noteId = $('#note-list .checked').parent().data('noteId');
    //检查noteId是否拿到了，如果没拿到直接弹窗
    if (noteId == null || noteId == '') {
        alert("未选定笔记");
        return;
    }
    var url = 'note/trashNote.do';
    var data = {
        noteId: noteId,
        statusId: 'delete'
    }
    $.post(
        url,
        data,
        function (result) {
            if (result.state == SUCCESS) {
                alert('放入回收站成功');
                $('#notebook-list .checked').click();
            } else {
                alert(result.message);
            }
        }
    )

}

/**
 * 根据得到的noteId删除笔记,这个函数应该是在垃圾箱界面被调用
 */
function deleteNote() {
    //从当前选中的笔记li上拿到绑定的noteId
    var noteId=$('#trash-bin .checked').parent().data('noteId');
    //检查noteId是否拿到了，如果没拿到直接弹窗
    if (noteId == null || noteId == '') {
        alert("未选定笔记");
        return;
    }
    var url = 'note/deleteNote.do';
    var data = {
        noteId: noteId
    }
    $.post(
        url,
        data,
        function (result) {
            if (result.state == SUCCESS) {
                alert('删除成功');
                $('#rollback_button').click();
            } else {
                alert(result.message);
            }
        }
    )

}

/**
 * 显示回收站内笔记移动页面，并加载所有笔记本列表以供移动
 */
function getNotebookListInTrashSelect() {
    $('#can').load('./alert/alert_replay.html', function () {
        // 获取笔记本列表
        setNoteBookToTrashSelect();
        //让光标保持在选项框里
        $('#replaySelect').focus();
    });
    $('.opacity_bg').show();
}

/**
 * 在移动垃圾箱笔记界面加载所有可供移入笔记本列表,从数据库加载笔记本数据
 */

function setNoteBookToTrashSelect() {
    var userId = getCookie('userId');
    if (userId == null || userId == '') {
        alert("userId不能为空");
        return;
    }
    var url = '/notebook/list.do';
    var data = {
        userId: userId
    }
    $.getJSON(url, data, function (result) {
        if (SUCCESS == result.state) {
            var notebooks = result.data;
            //在showMoveSelector函数里把所有拿到的笔记本名称显示出来
            showTrashMoveSelector(notebooks);
        }
        else {
            alert(result.message);
        }
    });
}

/**
 * 显示所有可供移动选择的笔记本选项
 * @param notebooks
 */
function showTrashMoveSelector(notebooks) {
    //定位到select下拉框
    var select = $('#replaySelect');
    //清空所有下拉框选项
    select.empty();
    var optionTemplate = '<option>[value]</option>';
    for (var i = 0; i < notebooks.length; i++) {
        var option = optionTemplate.replace('[value]', notebooks[i].name);
        option = $(option);
        //将notebookId绑定到相应的选项上
        option.data('notebookId', notebooks[i].id);
        //把生成的选项加到selector下
        select.append(option);
    }
}


/**
 * 恢复在回收站里的笔记
 */
function moveTrash(){
    //拿到当前选中项
    var option = $('#replaySelect option:selected');
    var notebookId = option.data('notebookId');
    var noteLi = $('#trash_show_li .checked').parent();
    var noteId = noteLi.data('noteId');
    //如果拿到的notebookId为空则提示
    if (noteId == null || notebookId == '') {
        alert('笔记id为空');
        return;
    }
    var url = '/note/moveNote.do';
    var data = {
        notebookId: notebookId,
        noteId: noteId
    };
    $.post(
        url,
        data,
        function (result) {
            if (result.state == SUCCESS) {
                $.post(
                    '/note/trashNote.do',
                    {
                        noteId:noteId,
                        statusId:'normal'
                    },
                    function(result){
                        if(result.state==SUCCESS){
                            alert('恢复笔记成功');
                            //触发一次回收站按钮点击事件，重新加载回收站笔记
                            $('#rollback_button').click();
                        }else{
                            alert('恢复笔记失败,请重试');
                        }
                    }

                );

            } else {
                alert(result.message);
            }
        }
    )
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