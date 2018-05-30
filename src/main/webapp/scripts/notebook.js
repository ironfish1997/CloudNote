/**
 * 打开创建笔记本界面
 */
$(document).on("click", "#add_notebook", function() {
    $('#can').load('./alert/alert_notebook.html', function(){
        $('#input_notebook').focus();
    });
    $('.opacity_bg').show();
}),