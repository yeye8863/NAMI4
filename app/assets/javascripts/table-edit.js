function nyp_table(table_name, config){
	
$("#view_"+table_name).click(viewRow);
$("#add_"+table_name).click(insRow);
$("#edit_"+table_name).click(editRow);
$("#delete_"+table_name).click(delData);
$("#cancel_"+table_name).click(cnclRow);
$("#table_"+table_name+" tbody").on("click", "tr", selRow);

var inkey = ["i", "I", "d", "D"];
var selected_c;
var table_c = $("#table_"+table_name).DataTable( {
	"columnDefs": [
		{"targets": config.norder, "orderable": false}
	],
	"order": config.sort,
  	"dom": "rt<'col-md-6'li><'col-md-6'p>",
	destroy: true
} );

var typingTimer;
var $input = $('#search_'+table_name);

$input.on('keyup', function () {
	clearTimeout(typingTimer);
	typingTimer = setTimeout(function(){
		table_c.search($input.val()).draw(false);
	}, 500);
});

$input.on('keydown', function () {
  clearTimeout(typingTimer);
});

function selDate(a, b){
	var now = new Date();
    var d1 = a.datepicker({
    	format: "yyyy-mm-dd",
    	endDate: now,
    	autoclose: true
    });
    if(b){
    	d1.on('changeDate', function() {
	    	d2.datepicker("setStartDate", d1.datepicker("getDate"));
	    	b[0].focus();
    	});
	    var d2_start = d1.datepicker("getDate");
	    if(!d2_start) d2_start = now;
	    var d2 = b.datepicker({
	    	format: "yyyy-mm-dd",
	    	startDate: d2_start,
	    	autoclose: true
	    });
    }
}

function viewRow(){
	if(!$("#edit_"+table_name).hasClass("editing")){
		var now = $("#table_"+table_name+" tbody .info").first();
		if(now.is(selected_c) == false){
			selected_c = now;
			if(selected_c.length){
				var cells = $("td", selected_c);
				config.edit.forEach(function(val, idx){
					var field = $("#" + table_name + "_field" + idx);
					field.val($(cells[idx]).html().trim());
					field.prop("readonly", true);
				});
				$("#"+table_name+"_cb").val(selected_c.data("cb"));
				$("#"+table_name+"_lmb").val(selected_c.data("lmb"));
				$("#info_"+table_name).collapse("show");
			}
		} else $("#info_"+table_name).collapse("toggle");
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
		editRow(0, true);
	}
}

function editRow(event, newrow) {
		if($("#edit_"+table_name).hasClass("editing")) saveData();
		else {
			if(newrow) selected_c = -1;
			else selected_c = $("#table_"+table_name+" tbody .info").first();
			if(selected_c.length || newrow){
				$("#edit_"+table_name).text("Save");
				$("#edit_"+table_name).addClass("editing");
				$("#delete_"+table_name).hide();
				$("#cancel_"+table_name).show();
				$("#info_"+table_name).collapse("show");
				var cells = $("td", selected_c);
				var dcell = [];
				config.edit.forEach(function(val, idx){
						var field = $("#" + table_name + "_field" + idx);
						if(newrow) field.val("");
						else field.val($(cells[idx]).html().trim());
						if(val == "d" || val == "D") dcell.push(field);
						if(inkey.indexOf(val) != -1) field.prop("readonly", false);
						else field.prop("readonly", true);
						field.removeClass("err");
				});
				if(newrow){
					$("#"+table_name+"_cb").val("");
					$("#"+table_name+"_lmb").val("");
				} else {
					$("#"+table_name+"_cb").val(selected_c.data("cb"));
					$("#"+table_name+"_lmb").val(selected_c.data("lmb"));
				}
				if(dcell != []) selDate(dcell[0], dcell[1]);
			}
		}
}

function saveRow(data){
	rstBtn();
	if(selected_c != -1){
		if(data.id) selected_c.data("id", data.id);
		table_c.row(selected_c).data( data.val ).draw();
		if(data.info){
			$(selected_c).data("lmb", data.info[1]);
			$(selected_c).data("cb", data.info[0]);
		}
	} else {
		var row = table_c.row.add(data.val).draw().node();
		if(data.id) $(row).data("id", data.id);
		if(data.info){
			$(row).data("lmb", data.info[1]);
			$(row).data("cb", data.info[0]);
		}
	}
	$("#title_"+table_name).notify("Successfully saved!", {arrowShow: false, className: "success", position:"right middle"});
}

function cnclRow(){
rstBtn();
	$("#info_"+table_name+" .err").removeClass("err");
}

function delRow(){
	rstBtn();
	table_c.row('.info').remove().draw(false);
	$("#title_"+table_name).notify("Successfully deleted!", {arrowShow: false, className: "success", position:"right middle"});
}

function rstBtn(){
	$("#edit_"+table_name).text("Edit");
	$("#edit_"+table_name).removeClass("editing");
	$("#cancel_"+table_name).hide();
	$("#delete_"+table_name).show();
	$("#info_"+table_name).collapse("hide");
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
				      	url: "/"+table_name+"s/" + $(this).data("id"),
				       	timeout: 5000,
				       	success: function(data, requestStatus, xhrObject){ delRow(); },
				       	error: function(xhrObj, textStatus, exception) {
				       		$("#title_"+table_name).notify("Failed to delete data!", {arrowShow: false, className: "error", position:"right middle"});
				       	}
					})   
				else delRow();
			});
	}
	selected_c = -1;
}

function saveData(){
	if(selected_c.length || selected_c == -1){
		var attr = [];
		var err = false;
		config.edit.forEach(function(val, idx) {
		    if(val != "x"){
				var field = $("#" + table_name + "_field" + idx);
				var item = field.val().trim();
				if(item == "" && (["I", "D"].indexOf(val) != -1)){ 
					err = true;
					field.addClass("err");
					$("#title_"+table_name).notify("Please enter missing items.", {arrowShow: false, className: "error", position:"right middle"});
				} else field.removeClass("err");
				attr.push(item);
		    }
		});
		if(!err){
			if(selected_c != -1 && selected_c.data("id"))
				$.ajax({
					type: "PUT",
					url: "/"+table_name+"s/" + selected_c.data("id"),
					data: {"attr": attr},
					timeout: 5000,
				    success: function(data, requestStatus, xhrObject){ saveRow(data); },
				    error: function(xhrObj, textStatus, exception) {
						$("#title_"+table_name).notify("Failed to save data!", {arrowShow: false, className: "error", position:"right middle"});
				    }
				})
			else
				$.ajax({
					type: "POST",
					url: "/"+table_name+"s/",
					data: {"attr": attr, "id": $("#donorId").text()}, //$("#table_"+table_name).data("id")},
					timeout: 5000,
				    success: function(data, requestStatus, xhrObject){ saveRow(data); },
				    error: function(xhrObj, textStatus, exception) {
						$("#title_"+table_name).notify("Failed to add data!", {arrowShow: false, className: "error", position:"right middle"});
				    }
				});
		}
	}
}

};

$(document).ready(function(){
	nyp_table("contact", {norder: [3], sort: [[ 0, "desc" ], [ 1, "desc" ]], edit: ["D","d","I","x"] });
	nyp_table("finance", {norder: [5], sort: [[1, "desc"], [2, "desc"]], edit: ["I","D","I","i","i","x"] });
});


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
