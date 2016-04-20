$("#add").click(insRow);
$("#edit").click(editRow);
$("#delete").click(delData);
$("#tabs").on("click", "li", fixHeader);
$("#contact_tab tbody").on("click", "tr", selRow);

var selected_c;
var header_c;
var table_c = $("#contact_tab").DataTable( {
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
	if($("#contact-tab", $(this)).length){
		setTimeout(function() {
			if($(".fixedHeader").length == 0 && $("#contact").hasClass("active")){
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
	if($("#edit").hasClass("editing")){
			selected_c.detach();
			$("#contact_tab tbody").prepend(selected_c);
			selected_c.addClass("info").siblings().removeClass("info");
	}
}

function selRow(event) {
	if(!$("#edit").hasClass("editing") && $(".dataTables_empty", $(this)).length == 0){
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
	if(!$("#edit").hasClass("editing")){
		var row = table_c.row.add(["","","","",""]).draw().node();
		$(row).addClass("info").siblings().removeClass("info");
		editRow(0, $(row));
	}
}

function editRow(event, r) {
	if(r) selected_c = r;
	else selected_c = $("#contact_tab tbody .info").first();
	if(selected_c.length)
		if($("#edit").hasClass("editing")) saveData();
		else{
			$("#edit").text("Save");
			$("#edit").addClass("editing");
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
	$("#edit").text("Edit");
	$("#edit").removeClass("editing");
	$("#add").notify("Successfully saved!", {gap: 205, arrowShow: false, className: "success", position:"left middle"});
}

function delRow(){
	if($("#edit").hasClass("editing")){
		$("#edit").removeClass("editing");
		$("#edit").text("Edit");
	}
	table_c.row('.info').remove().draw(false);
	$("#add").notify("Successfully deleted!", {gap: 205, arrowShow: false, className: "success", position:"left middle"});
}

function delData(event){
	selected_c = $("#contact_tab tbody .info");
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
				       		$("#add").notify("Failed to delete data!", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
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
			$("#add").notify("Please enter contact date.", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
			return false;
		}
		if(attr[2] == ""){ 
			$("#add").notify("Please enter narrative.", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
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
					$("#add").notify("Failed to save data!", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
			    }
			})
		else
			$.ajax({
				type: "POST",
				url: "/contacts/",
				data: {"attr": attr, "id": $("#contact_tab").data("id")},
				timeout: 5000,
			    success: function(data, requestStatus, xhrObject){ saveRow(data); },
			    error: function(xhrObj, textStatus, exception) {
					$("#add").notify("Failed to add data!", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
			    }
			})
	}
}



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
