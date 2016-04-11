//select row
$("#contact tbody").on("click", "tr", function(event) {
	if(!$("#edit").hasClass("editing")){
		if($(this).hasClass("active"))
			$(this).removeClass("active");
		else $(this).addClass("active").siblings().removeClass("active");
	}
});

//add row
$("#add").click(function() {
	if(!$("#edit").hasClass("editing")){
		var row = $("#contact tbody")[0].insertRow(0);
		$(row).addClass("active").siblings().removeClass("active");
		for(var i=0; i<=4; i++) row.insertCell(i).innerHTML = "<input>";
		$("#edit").addClass("editing");
		$("#edit").text("Save");
	}
});

//edit row
$("#edit").click(function() {
	var selected = $("#contact tbody .active");
	if(selected.length)
		if($(this).hasClass("editing")){
			$("td", selected).each(function(){
				$(this).html($("input", $(this)).val());
			});
			$(this).text("Edit");
			$(this).removeClass("editing");
		}else{
			$("td", selected).each(function(){
				if($("input", $(this)).length == 0)
					$(this).html("<input value=" + $(this).text() + ">");
			});
			$(this).text("Save");
			$(this).addClass("editing");
		}
});

//delete row
$("#delete").click(function(){
	var selected = $("#contact tbody .active");
	if(confirm("Are you sure?"))
		selected.each(function(){ $(this).remove() });
	if($("#edit").hasClass("editing")){
		$("#edit").removeClass("editing");
		$("#edit").text("Edit");
	}
});

