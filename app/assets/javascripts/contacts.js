function nyp_table(table_name){
	
$("#add_"+table_name).click(insRow);
$("#edit_"+table_name).click(editRow);
$("#delete_"+table_name).click(delData);
$("#tabs").on("click", "li", fixHeader);
$("#table_"+table_name+" tbody").on("click", "tr", selRow);

var selected_c;
var header_c;
var table_c = $("#table_"+table_name).DataTable( {
	"columns": [
    	{ "width": "15%" },
    	{ "width": "15%" },
    	{ "width": "40%" },
    	{ "width": "15%",  "orderable": false },
    	{ "width": "15%",  "orderable": false },
  	],
	"order": [[ 0, "desc" ], [ 1, 'desc' ]],
  	"drawCallback": function( settings ) { topRow(); },
  	"dom": 'rt<"bottom-left-info-bar"f>',
    paging: false
} );

function fixHeader(){
	if($("#"+table_name+"-tab", $(this)).length){
		setTimeout(function() {
			if($(".fixedHeader").length == 0 && $("#"+table_name).hasClass("active")){
				header_c = new FixedHeader(table_c);
				$(window).resize(function(){ header_c._fnUpdateClones(true) })
			}
		}, 1000);
	} else $(".fixedHeader").remove();
}

function selDate(a, b){
	var now = new Date();
    var d1 = a.datepicker({
    	format: "yyyy-mm-dd",
    	endDate: now,
    	autoclose: true
    }).on('changeDate', function() {
    	d2.datepicker("setStartDate", d1.datepicker("getDate"));
    	b[0].focus();
    });
    var d2 = b.datepicker({
    	format: "yyyy-mm-dd",
    	startDate: now,
    	autoclose: true
    });
}

function topRow(){
	if($("#edit_"+table_name).hasClass("editing")){
			selected_c.detach();
			$("#table_"+table_name+" tbody").prepend(selected_c);
			selected_c.addClass("info").siblings().removeClass("info");
	}
}

function selRow(event) {
	if(!$("#edit_"+table_name).hasClass("editing") && $(".dataTables_empty", $(this)).length == 0){
		if($(this).hasClass("info"))
			if(event.ctrlKey || event.metaKey) $(this).removeClass("info");
			else table_c.$("tr.info").removeClass("info");
		else {
			if(!(event.ctrlKey || event.metaKey))
				table_c.$("tr.info").removeClass("info");
			$(this).addClass("info");
		}
	}
}

function insRow() {
	if(!$("#edit_"+table_name).hasClass("editing")){
		var row = table_c.row.add(["","","","",""]).draw().node();
		$(row).addClass("info").siblings().removeClass("info");
		editRow(0, $(row));
	}
}

function editRow(event, r) {
	if(r) selected_c = r;
	else selected_c = $("#table_"+table_name+" tbody .info").first();
	if(selected_c.length)
		if($("#edit_"+table_name).hasClass("editing")) saveData();
		else{
			$("#edit_"+table_name).text("Save");
			$("#edit_"+table_name).addClass("editing");
			var cells = $("td", selected_c).slice(0, 3);
			cells.each(function(){
				if($("input", $(this)).length == 0)
					$(this).html("<input style='width:100%' value='" + $(this).html().trim() + "'>");
			});
			selDate($("input", cells[0]), $("input", cells[1]));
		}
	topRow();
}

function saveRow(data){
	if(data.id) selected_c.data("id", data.id);
	table_c.row(selected_c).data([
		data.contact_date,
		data.followup_date,
		data.narrative,
		data.created_by,
		data.last_modified_by
	]).draw();
	$("#edit_"+table_name).text("Edit");
	$("#edit_"+table_name).removeClass("editing");
	$("#add_"+table_name).notify("Successfully saved!", {gap: 205, arrowShow: false, className: "success", position:"left middle"});
}

function delRow(){
	if($("#edit_"+table_name).hasClass("editing")){
		$("#edit_"+table_name).removeClass("editing");
		$("#edit_"+table_name).text("Edit");
	}
	table_c.row('.info').remove().draw(false);
	$("#add_"+table_name).notify("Successfully deleted!", {gap: 205, arrowShow: false, className: "success", position:"left middle"});
}

function delData(event){
	selected_c = $("#table_"+table_name+" tbody .info");
	if(selected_c.length){
		var sure;
		if(event.ctrlKey || event.metaKey) sure = true
		else sure = confirm("Are you sure?");
		if(sure)
			selected_c.each( function(){
				if($(this).data("id"))
				 	$.ajax({
						type: "DELETE",
				      	url: "/contacts/" + $(this).data("id"),
				       	timeout: 5000,
				       	success: function(data, requestStatus, xhrObject){ delRow(); },
				       	error: function(xhrObj, textStatus, exception) {
				       		$("#add_"+table_name).notify("Failed to delete data!", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
				       	}
					})   
				else delRow();
			});
	}
}

function saveData(){
	if(selected_c.length){
		var attr = [];
		var cells = $("td", selected_c).slice(0, 3);
		cells.each(function(){
			attr.push($("input", $(this)).val().trim());
		});
		if(attr[0] == ""){ 
			$("#add_"+table_name).notify("Please enter contact date.", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
			return false;
		}
		if(attr[2] == ""){ 
			$("#add_"+table_name).notify("Please enter narrative.", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
			return false;
		}
		if(selected_c.data("id"))
			$.ajax({
				type: "PUT",
				url: "/contacts/" + selected_c.data("id"),
				data: {"attr": attr},
				timeout: 5000,
			    success: function(data, requestStatus, xhrObject){ saveRow(data); },
			    error: function(xhrObj, textStatus, exception) {
					$("#add_"+table_name).notify("Failed to save data!", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
			    }
			})
		else
			$.ajax({
				type: "POST",
				url: "/contacts/",
				data: {"attr": attr, "id": $("#table_"+table_name).data("id")},
				timeout: 5000,
			    success: function(data, requestStatus, xhrObject){ saveRow(data); },
			    error: function(xhrObj, textStatus, exception) {
					$("#add_"+table_name).notify("Failed to add data!", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
			    }
			})
	}
}
};

$(document).ready(nyp_table("contact"));


/*
$(document).ready(function(){
	resizeDiv();
});
window.onresize = function(event) { resizeDiv(); }

function resizeDiv() {
	var vph = $(window).height();
	$("#contact_tab").css({overflow: "auto", height: vph*0.5 + "px"});
}
*/
