//= require bootstrap-datepicker
$("#add").click(insRow);
$("#edit").click(editRow);
$("#delete").click(delData);
$("#contact_tab tbody").on("click", "tr", selRow);

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

function selRow(event) {
	if(!$("#edit").hasClass("editing")){
		if($(this).hasClass("info"))
			$(this).removeClass("info");
		else $(this).addClass("info").siblings().removeClass("info");
	}
}

function insRow() {
	if(!$("#edit").hasClass("editing")){
		var row = $("#contact_tab tbody")[0].insertRow(0);
		var cells = new Array(3);
		$(row).addClass("info").siblings().removeClass("info");
		for(var i=0; i<=2; i++){
			cells[i] = row.insertCell(i);
			cells[i].innerHTML = "<input value style='width:100%'>";
		}
		selDate($("input", cells[0]), $("input", cells[1]));
		for(var i=3; i<=4; i++) row.insertCell(i);
		$("#edit").addClass("editing");
		$("#edit").text("Save");
	}
}

function editRow() {
	var selected = $("#contact_tab tbody .info");
	if(selected.length)
		if($(this).hasClass("editing")) saveData();
		else{
			var cells = $("td", selected).slice(0, 3);
			cells.each(function(){
				if($("input", $(this)).length == 0)
					$(this).html("<input style='width:100%' value='" + $(this).html().trim() + "'>");
			});
			selDate($("input", cells[0]), $("input", cells[1]));
			$(this).text("Save");
			$(this).addClass("editing");
		}
}

function saveRow(data){
	var selected = $("#contact_tab tbody .info");
	var cells = $("td", selected);
	if(cells[0]) $(cells[0]).html(data.contact_date);
	if(cells[1]) $(cells[1]).html(data.followup_date);
	if(cells[2]) $(cells[2]).html(data.narrative);
	if(cells[3]) $(cells[3]).html(data.created_by);
	if(cells[4]) $(cells[4]).html(data.last_modified_by);
	if(data.id) selected.data("id", data.id);
	$("#edit").text("Edit");
	$("#edit").removeClass("editing");
	$("#contact_tab").notify("Save success!", {className: "success", position:"bottom left"});
}

function delRow(){
	var selected = $("#contact_tab tbody .info");
	if(selected.length)
		selected.each(function(){ $(this).remove() });
	if($("#edit").hasClass("editing")){
		$("#edit").removeClass("editing");
		$("#edit").text("Edit");
	}
	$("#contact_tab").notify("Delete success!", {className: "success", position:"bottom left"});
}

function delData(){
	var selected = $("#contact_tab tbody .info");
	if(selected.length)
		if(confirm("Are you sure?"))
			if(selected.data("id"))
			 	$.ajax({
					type: "DELETE",
			      	url: "/contacts/" + selected.data("id"),
			       	timeout: 5000,
			       	success: function(data, requestStatus, xhrObject){ delRow(); },
			       	error: function(xhrObj, textStatus, exception) {
			       		$("#contact_tab").notify("Failed to delete data!", {className: "error", position:"bottom left"});
			       	}
				})   
			else delRow();
}

function saveData(){
	var selected = $("#contact_tab tbody .info");
	if(selected.length){
		var attr = [];
		var cells = $("td", selected).slice(0, 3);
		cells.each(function(){
			attr.push($("input", $(this)).val());
		});
		if(selected.data("id"))
			$.ajax({
				type: "PUT",
				url: "/contacts/" + selected.data("id"),
				data: {"attr": attr},
				timeout: 5000,
			    success: function(data, requestStatus, xhrObject){ saveRow(data); },
			    error: function(xhrObj, textStatus, exception) {
					$("#contact_tab").notify("Failed to save data!", {className: "error", position:"bottom left"});
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
					$("#contact_tab").notify("Failed to add data!", {className: "error", position:"bottom left"});
			    }
			})
	}
}