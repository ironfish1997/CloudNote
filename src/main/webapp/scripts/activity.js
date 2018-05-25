/***
 * 获得活动列表
 */
function getActivityList(){
	alert("获得活动列表");
}

/***
 * 查询指定活动下已参加活动的笔记列表
 */
function getNoteActivitys(){
	alert("查询参加活动的笔记列表");
}

/***
 * 查询活动笔记内容
 */
function getNoteActivityDetail(){
	console.log("查询活动笔记内容");
}

/***
 * 查询可选择的笔记本
 */
function getSelectNoteBook(){
	alert("查询可选择的笔记本");
}

/***
 * 查询可选择的笔记
 */
function getSelectNoteList(){
	alert("查询可选择的笔记");
}

/***
 *	将用户选择的笔记参加活动
 */
function createNoteActivity(){
	alert("将用户选择的笔记参加活动");
	$('.close,.cancle').trigger('click');
}

/***
 *	分享活动笔记
 */
function likeActivityNote() {
	alert("分享活动笔记");
}

/***
 *	顶笔记
 */
function up() {
	alert("顶笔记");
}

/***
 *	踩笔记
 */
function down(noteActivityId, dom) {
	alert("踩笔记");
}
