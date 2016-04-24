function nyp_table(table_name, config){
	
$("#add_"+table_name).click(insRow);
$("#edit_"+table_name).click(editRow);
$("#delete_"+table_name).click(delData);
$("#tabs").on("click", "li", fixHeader);
$("#table_"+table_name+" tbody").on("click", "tr", selRow);

var inkey = ["i", "I", "d", "D"];
var selected_c;
var header_c;
var table_c = $("#table_"+table_name).DataTable( {
	"columnDefs": [
		{"targets": config.norder, "orderable": false}
	],
	"order": config.sort,
  	"drawCallback": function( settings ) { topRow(); },
  	"dom": 'rt<"bottom-left-info-bar"f>',
	destroy: true,
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
		var row = table_c.row.add(config.edit).draw().node();
		$("td", $(row)).html("");
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
			var cells = $("td", selected_c);
			var dcell = [];
			cells.each(function(idx, val){
				if($("input", val).length == 0 && inkey.indexOf(config.edit[idx]) != -1 ){
					$(val).html("<input type='text' value='" + $(val).html().trim() + "'>");
					if(config.edit[idx] == "d" || config.edit[idx] == "D") dcell.push($("input", val));
				}
			});
			if(dcell != []) selDate(dcell[0], dcell[1]);
		}
	topRow();
}

function saveRow(data){
	if(data.id) selected_c.data("id", data.id);
	table_c.row(selected_c).data( data.val ).draw();
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
				      	url: "/"+table_name+"s/" + $(this).data("id"),
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
		var err = false;
		var cells = $("td", selected_c);
		cells.each(function(idx, val){
			if(config.edit[idx] != "x"){
				var item = $("input", val).val().trim();
				if(item == "" && (["I", "D"].indexOf(config.edit[idx]) != -1)){ 
					err = true;
					console.log($("input", val));
					$("input", val).addClass("err");
					$("#add_"+table_name).notify("Please enter missing items.", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
					return false;
				} else $("input", val).removeClass("alert-dange");
				attr.push(item);
			}
		});
		if(!err){
			if(selected_c.data("id"))
				$.ajax({
					type: "PUT",
					url: "/"+table_name+"s/" + selected_c.data("id"),
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
					url: "/"+table_name+"s/",
					data: {"attr": attr, "id": $("#table_"+table_name).data("id")},
					timeout: 5000,
				    success: function(data, requestStatus, xhrObject){ saveRow(data); },
				    error: function(xhrObj, textStatus, exception) {
						$("#add_"+table_name).notify("Failed to add data!", {gap: 205, arrowShow: false, className: "error", position:"left middle"});
				    }
				});
		}
	}
}
};

$(document).ready(function(){
	nyp_table("contact", {norder: [3,4], sort: [[ 0, "desc" ], [ 1, "desc" ]], edit: ["D","d","I","x","x"] });
	nyp_table("finance", {norder: [], sort: [[1, "desc"]], edit: ["I","D","I","i","i","x"] });
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
