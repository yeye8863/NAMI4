$("#add").click(insRow);
$("#edit").click(editRow);
$("#delete").click(delData);
$("#contact_tab tbody").on("click", "tr", selRow);

function selRow(event) {
	if(!$("#edit").hasClass("editing")){
		if($(this).hasClass("active"))
			$(this).removeClass("active");
		else $(this).addClass("active").siblings().removeClass("active");
	}
}

function insRow() {
	if(!$("#edit").hasClass("editing")){
		var row = $("#contact_tab tbody")[0].insertRow(0);
		$(row).addClass("active").siblings().removeClass("active");
		for(var i=0; i<=2; i++) row.insertCell(i).innerHTML = "<input>";
		for(var i=3; i<=4; i++) row.insertCell(i);
		$("#edit").addClass("editing");
		$("#edit").text("Save");
	}
}

function editRow() {
	var selected = $("#contact_tab tbody .active");
	if(selected.length)
		if($(this).hasClass("editing")) saveData();
		else{
			var cells = $("td", selected).slice(0, 3);
			cells.each(function(){
				if($("input", $(this)).length == 0)
					$(this).html("<input style='width:100%' value='" + $(this).text().trim() + "'>");
			});
			$(this).text("Save");
			$(this).addClass("editing");
		}
}

function saveRow(id){
	var selected = $("#contact_tab tbody .active");
	var cells = $("td", selected).slice(0, 3);
	cells.each(function(){
		$(this).html($("input", $(this)).val().trim());
	});
	if(id) selected.data("id", id);
	$("#edit").text("Edit");
	$("#edit").removeClass("editing");
}

function delRow(){
	var selected = $("#contact_tab tbody .active");
	if(selected.length)
		selected.each(function(){ $(this).remove() });
	if($("#edit").hasClass("editing")){
		$("#edit").removeClass("editing");
		$("#edit").text("Edit");
	}
}

function delData(){
	var selected = $("#contact_tab tbody .active");
	if(selected.length)
		if(confirm("Are you sure?"))
			if(selected.data("id"))
			 	$.ajax({
					type: "DELETE",
			      	url: "/contacts/" + selected.data("id"),
			       	timeout: 5000,
			       	success: function(data, requestStatus, xhrObject){ delRow(); },
			       	error: function(xhrObj, textStatus, exception) { alert('Error!'); }
				})   
			else delRow();
}

function saveData(){
	var selected = $("#contact_tab tbody .active");
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
			    success: function(data, requestStatus, xhrObject){ saveRow(); },
			    error: function(xhrObj, textStatus, exception) { alert('Error!'); }
			})
		else
			$.ajax({
				type: "POST",
				url: "/contacts/",
				data: {"attr": attr, "id": $("#contact_tab").data("id")},
				timeout: 5000,
			    success: function(data, requestStatus, xhrObject){ saveRow(data); },
			    error: function(xhrObj, textStatus, exception) { alert('Error!'); }
			})
	}
}