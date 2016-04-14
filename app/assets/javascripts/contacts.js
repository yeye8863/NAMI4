//= require bootstrap-datepicker
$("#add").click(insRow);
$("#edit").click(editRow);
$("#delete").click(delData);
$("#contact_tab tbody").on("click", "tr", selRow);

var selected_c;
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
  	"initComplete": function(){
  	},
  	"dom": 'rt<"bottom-left-info-bar"f>',
    paging:         false
} );

function selDate(a, b){
	var now = new Date();
    var d1 = a.datepicker({
    	format: "yyyy-mm-dd",
    	onRender: function(date) {
    		return date.valueOf() > now.valueOf() ? "disabled" : "";
    	}
    }).on('changeDate', function(ev) {
    	if (ev.date.valueOf() > d2.date.valueOf()) {
	        var newDate = new Date(ev.date)
	        newDate.setDate(newDate.getDate() + 1);
	        d2.setValue(newDate);
      	}
    	d1.hide();
    	b[0].focus();
    }).data('datepicker');
    var d2 = b.datepicker({
    	format: "yyyy-mm-dd",
      	onRender: function(date) {
    		return date.valueOf() < d1.date.valueOf() ? "disabled" : "";
      	}
    }).on('changeDate', function(ev) {
      	d2.hide();
    }).data('datepicker');
}

function topRow(){
	if($("#edit").hasClass("editing")){
			selected_c.detach();
			$("#contact_tab tbody").prepend(selected_c);
			selected_c.addClass("info").siblings().removeClass("info");
	}
}

function selRow(event) {
	if(!$("#edit").hasClass("editing")){
		if($(this).hasClass("info"))
			$(this).removeClass("info");
		else $(this).addClass("info").siblings().removeClass("info");
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
	else selected_c = $("#contact_tab tbody .info");
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
	selected_c = $("#contact_tab tbody .info");
	var cells = $("td", selected_c);
	if(cells[0]) $(cells[0]).html(data.contact_date);
	if(cells[1]) $(cells[1]).html(data.followup_date);
	if(cells[2]) $(cells[2]).text(data.narrative);
	if(cells[3]) $(cells[3]).html(data.created_by);
	if(cells[4]) $(cells[4]).html(data.last_modified_by);
	if(data.id) selected_c.data("id", data.id);
	$("#edit").text("Edit");
	$("#edit").removeClass("editing");
	$("#add").notify("Successfully saved!", {arrowShow: false, className: "success", position:"left middle"});
}

function delRow(){
	if($("#edit").hasClass("editing")){
		$("#edit").removeClass("editing");
		$("#edit").text("Edit");
	}
	table_c.row('.info').remove().draw(false);
	$("#add").notify("Successfully deleted!", {arrowShow: false, className: "success", position:"left middle"});
}

function delData(){
	selected_c = $("#contact_tab tbody .info");
	if(selected_c.length)
		if(confirm("Are you sure?"))
			if(selected_c.data("id"))
			 	$.ajax({
					type: "DELETE",
			      	url: "/contacts/" + selected_c.data("id"),
			       	timeout: 5000,
			       	success: function(data, requestStatus, xhrObject){ delRow(); },
			       	error: function(xhrObj, textStatus, exception) {
			       		$("#add").notify("Failed to delete data!", {arrowShow: false, className: "error", position:"left middle"});
			       	}
				})   
			else delRow();
}

function saveData(){
	selected_c = $("#contact_tab tbody .info");
	if(selected_c.length){
		var attr = [];
		var cells = $("td", selected_c).slice(0, 3);
		cells.each(function(){
			attr.push($("input", $(this)).val().trim());
		});
		if(attr[0] == ""){ 
			$("#add").notify("Please enter contact date.", {arrowShow: false, className: "error", position:"left middle"});
			return false;
		}
		if(attr[2] == ""){ 
			$("#add").notify("Please enter narrative.", {arrowShow: false, className: "error", position:"left middle"});
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
					$("#add").notify("Failed to save data!", {arrowShow: false, className: "error", position:"left middle"});
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
					$("#add").notify("Failed to add data!", {arrowShow: false, className: "error", position:"left middle"});
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
