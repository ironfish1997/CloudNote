/**********公共函数**********/
//格式化字符串，转义<和>
function formate_name(e){
	e=e.replace(/</g,'&lt;');
	e=e.replace(/>/g,'&gt;');
	return e;
}
//去掉空格
function check_null(s){
	s=s.replace(/ /g,'');
	s=s.length;
	return s;
}


/**********HTML初始化时直接调用的函数**********/
//获取笔记本列表,edit.html初始化时调用
function get_nb_list(){
	loadNormalNoteBook();
}

//获取特殊笔记本列表,edit.html初始化时调用
function get_spnb_list(){
	loadSpecialNoteBook();
}

//获取活动列表,activity.html初始化时调用
function activity_list(){
	getActivityList();
}

//获取活动页面参加活动笔记列表,activity_detail.html初始化时调用
function get_activity_list(){
	var param=window.location.hash;
	global_ac_id=param.replace(/#/,'');
	getNoteActivitys();
}



/**********HTML初始化后为其按钮绑定函数**********/
//注册事件
$(function(){
	
	//----关闭，取消
	$(document).on("click", ".close,.cancle", function() {
		//清空弹出页面中输入的内容
		$('#input_notebook,#input_note').val('');
		//隐藏弹出页面
        $('.modal.fade.in').hide();
        //隐藏弹出的div
        $('.opacity_bg').hide();
    }),
	
    
    /***********笔记本模块************/
	//----单击笔记本,查询笔记
	$(document).on("click", "#pc_part_1 li", function() {
		$('#pc_part_2,#pc_part_3').show();
		//$('#pc_part_2 ul').empty();
		$('#pc_part_4,#pc_part_5,#pc_part_6,#pc_part_7,#pc_part_8').hide();
		$('#rollback_button,#like_button,#action_button').removeClass('clicked');
		$(this).siblings('li').children('a').removeClass('checked');
		$(this).children('a').addClass('checked');
		//获取笔记本下的笔记列表
		getNormalNoteList();
    }),
    
	//----打开创建笔记本界面
	$(document).on("click", "#add_notebook", function() {
		$('#can').load('./alert/alert_notebook.html', function(){
			$('#input_notebook').focus();
		});
		$('.opacity_bg').show();
    }),
    
	//----创建笔记本
	$(document).on("click", "#modalBasic .btn.btn-primary.sure", function() {
		addNoteBook();
    }),
    
	//----双击,打开修改笔记本界面
	$(document).on("dblclick", "#pc_part_1 li:gt(0)", function() {
		$('#can').load('./alert/alert_rename.html',function(){
			$('#input_notebook_rename').focus();
		});
		$('.opacity_bg').show();
    }),
    
    //修改笔记本
	$(document).on("click",'#modalBasic_4 .sure',function() {
		updateNoteBook();
	});
    
	//----打开删除笔记本界面
	$(document).on("click", "#first_side_right .btn_delete", function() {
		$('#can').load('./alert/alert_delete_notebook.html');
		$('.opacity_bg').show();
    }),
	
    //----删除笔记本
	$(document).on('click','#modalBasic_6 .btn.btn-primary.sure',function(){
		//删除
		deleteNoteBook();
	});
    
	
	
	/***********笔记模块************/
	//----点击笔记
	$(document).on("click", "#pc_part_2 li", function() {
		$(this).siblings('li').children('a').removeClass('checked');
		$(this).children('a').addClass('checked');
		getNoteDetail();
    }),
    
	//----打开创建笔记界面
	$(document).on("click", "#add_note", function() {
		$('#can').load('./alert/alert_note.html',function() {
			$('#input_note').focus();
		});
		$('.opacity_bg').show();
    }),
    
	//----创建笔记
	$(document).on("click", "#modalBasic_2 .btn.btn-primary.sure", function() {
		//保存
		createNormalNote();
    }),
    
    //----保存笔记内容
    $(document).on("click","#save_note", function() {
		//修改
		updateNormalNote();
    }),
    
    //----点击笔记下拉按钮
	$(document).on("click", ".btn_slide_down", function() {
		$(this).parents('li').children('.note_menu').addClass('note_menu_show').mouseleave(function(){
			$(this).removeClass('note_menu_show');
		});
    }),
    
    //----打开删除笔记界面
	$(document).on("click", "#second_side_right .btn_delete", function() {
		$('#can').load('./alert/alert_delete_note.html');
		$('.opacity_bg').show();
    }),
    
	//----确认删除
	$(document).on('click','#modalBasic_7 .btn.btn-primary.sure', function() {
		deleteNormalNote();
	});
    
	//----打开移动笔记界面
	$(document).on("click", "#second_side_right .btn_move", function() {
		$('#can').load('./alert/alert_move.html',function(){
			// 获取笔记本列表
			setNoteBookToSelect();
			$('#moveSelect').focus();
		});
		$('.opacity_bg').show();
    }),
    
	//----确认移动
	$(document).on('click','#modalBasic_11 .btn.btn-primary.sure',function(){
		moveNote();
	});
    
	//----分享笔记
	$(document).on("click", "#second_side_right .btn_share", function() {
		$(this).fadeOut(600);
		createShareNote();
    }),
    
    
    /***********回收站模块************/
	//----点击回收站按钮
	$(document).on("click", "#rollback_button", function() {
		$('#pc_part_2,#pc_part_3,#pc_part_6,#pc_part_7,#pc_part_8').hide();
		$('#pc_part_4,#pc_part_5').show();
		$('#first_side_right li a').removeClass('checked');
		$('#like_button,#action_button').removeClass('clicked');
		$(this).addClass('clicked');
		//每次加载前先清空所有li
		//$('#pc_part_4 ul').empty();
		getRecycleNoteList();
    }),
    
	//----点击回收站笔记
	$(document).on("click", "#pc_part_4 li", function() {
		$(this).siblings('li').children('a').removeClass('checked');
		$(this).children('a').addClass('checked');
		getRecycleNoteDetail();
    }),
    
	//----点击回收站恢复按钮
	$(document).on("click", "#four_side_right .btn_replay", function() {
		$('#can').load('./alert/alert_replay.html',function(){
			setNoteBookToSelect();
			$('#replaySelect').focus();
		});
		$('.opacity_bg').show();
    }),
    
	//----确认恢复
	$(document).on('click','#modalBasic_3 .btn.btn-primary.sure', function(){
		moveNote();
	});

	//----点击回收站删除按钮
	$(document).on("click", "#four_side_right .btn_delete", function() {
		$('#can').load('./alert/alert_delete_rollback.html');
		$('.opacity_bg').show();
    }),
    
	//----确认删除
	$(document).on('click','#modalBasic_10 .btn.sure', function() {
		deleteRecycleNote();
	});
    
	
	/***********搜索笔记模块************/
	//----搜索笔记
	$(document).on("keyup", "body", function(e) {
		if($('#search_note').is(':focus')&&(e.keyCode==108||e.keyCode==13)){
			var m=$('#search_note').val();
			var n=m.replace(/ /g,'');
			var a=n.length;
			if(a!=0){
				//$('#sixth_side_right ul').empty();
				getShareNoteList();
			}
		}
    }),
    
	//----更多搜索笔记
	$(document).on("click", "#more_note", function() {
		getShareNoteList();
    }),
    
	//----点击搜索笔记
	$(document).on("click", "#sixth_side_right li", function() {
		$(this).siblings('li').children('a').removeClass('checked');
		$(this).children('a').addClass('checked');
		getShareNoteDetail();
    }),
    
	//----收藏搜索笔记
	$(document).on("click", "#pc_part_6 .btn_like", function() {
		$('#can').load('./alert/alert_like.html', function(){
			$('#modalBasic_5 .btn.btn-primary.sure').click(function(){
				likeShareNote();
			});
		});
		$('.opacity_bg').show();
    }),
    
    
    /***********注册收藏笔记相关操作************/
	//----点击收藏按钮
	$(document).on("click", "#like_button", function() {
		$('#pc_part_2,#pc_part_3,#pc_part_4,#pc_part_6,#pc_part_8').hide();
		$('#pc_part_7,#pc_part_5').show();
		$('#first_side_right li a').removeClass('checked');
		$('#rollback_button,#action_button').removeClass('clicked');
		$(this).addClass('clicked');
		//每次加载前先清空所有li
		//$('#pc_part_7 ul').empty();
		getLikeNoteList();
    }),
	
	//----点击收藏笔记
	$(document).on("click", "#pc_part_7 li", function() {
		$(this).siblings('li').children('a').removeClass('checked');
		$(this).children('a').addClass('checked');
		getLikeNoteDetail();
    }),
    
	//----点击取消收藏
	$(document).on("click", "#pc_part_7 li .btn_delete", function() {
		$('#can').load('./alert/alert_delete_like.html');
		$('.opacity_bg').show();
    }),
    
	//----确认取消
	$(document).on('click','#modalBasic_9 .btn.btn-primary.sure', function(){
		deleteLikeNote();
		
	});
    
	
	/***********参加活动笔记模块************/
	//----点击参加活动笔记按钮
	$(document).on("click", "#action_button", function() {
		$('#pc_part_2,#pc_part_3,#pc_part_6,#pc_part_7,#pc_part_4').hide();
		$('#pc_part_8,#pc_part_5').show();
		$('#first_side_right li a').removeClass('checked');
		$('#rollback_button,#like_button').removeClass('clicked');
		$(this).addClass('clicked');
		//$("#eighth_side_right ul").empty();
		getNoteActivityList();
    }),
    
    //----点击参加活动笔记
	$(document).on("click", "#pc_part_8 li", function() {
		$(this).siblings('li').children('a').removeClass('checked');
		$(this).children('a').addClass('checked');
		getActivityNoteDetail();
    }),
	
    
    
    
    
    /***********活动模块************/
	//----更多活动笔记
	$(document).on("click", "#more_activity_note", function() {
		getNoteActivitys();
    });
	
	//----点击笔记(活动页面)
	$(document).on("click", "#action_part_1 li", function() {
		$('#rollback_button').removeClass('clicked');
		$(this).siblings('li').children('a').removeClass('checked');
		$(this).children('a').addClass('checked');
		$("#content_body").empty();
		getNoteActivityDetail();
    }),
	
	//----点击参加活动（活动页面）
	$(document).on("click", "#join_action", function() {
		$('#modalBasic_15,.opacity_bg').show();
		//$('#select_notebook ul').empty();
		//$('#select_note ul').empty();
		getSelectNoteBook();
    }),
    
	//----准备选择参加活动笔记（活动页面）
	$(document).on("click", "#select_notebook li", function() {
		$(this).siblings('li').children('a').removeClass('checked');
		$(this).children('a').addClass('checked');
		//$('#select_note ul').empty();
		getSelectNoteList();
    }),
    
	//----选择笔记（活动页面）
	$(document).on("click", "#select_note li", function() {
		$(this).siblings('li').children('a').removeClass('checked');
		$(this).children('a').addClass('checked');
    }),

	//----确认选择的笔记（活动页面）
	$(document).on("click", "#modalBasic_15 .btn.btn-primary.sure", function() {
		//var get_notename=$('#select_note li a.checked').text();
		//$('.close,.cancle').trigger('click');
		createNoteActivity();
    }),
    
	//----点击收藏（活动页面）
	$(document).on('click',"#first_action .btn_like", function() {
		likeActivityNote();
    }),
	
	//----顶笔记（活动页面）
	$(document).on("click", "#first_action .btn_up", function() {
		up();
    }),
    
	//----踩笔记（活动页面）
	$(document).on("click", "#first_action .btn_down", function() {
		down();
    });
	
});