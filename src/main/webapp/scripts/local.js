/**********HTML初始化后为其按钮绑定函数**********/
//注册事件
$(function () {

    //----关闭，取消
    $(document).on("click", ".close,.cancle", function () {
        //清空弹出页面中输入的内容
        $('#input_notebook,#input_note').val('');
        //隐藏弹出页面
        $('.modal.fade.in').hide();
        //隐藏弹出的div
        $('.opacity_bg').hide();
    });

    $(document).on("keydown", function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        //如果键盘输入时间的ascii码是13(回车键)
        if (e && e.keyCode == 13) {
            $('#can').find('.sure').click();
        }
    });


    /***********回收站模块************/
    //点击回收站按钮
    $(document).on("click", "#rollback_button", function () {
        showTrashNotes();

    });

    //点击回收站恢复按钮
    $(document).on("click", "#four_side_right .btn_replay", getNotebookListInTrashSelect);

    //确认恢复
    $(document).on('click', '#recover_note_dialog .btn.btn-primary.sure', function () {
        moveTrash();
    });

    //点击回收站删除按钮
    $(document).on("click", "#four_side_right .btn_delete", function () {
        $('#can').load('./alert/alert_delete_rollback.html');
        $('.opacity_bg').show();

    });

    //确认删除
    $(document).on('click', '#final_delete_dialog .btn.sure', function () {
        deleteNote();
    });

});