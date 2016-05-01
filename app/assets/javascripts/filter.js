//--filter.js
//= require bootstrap-datepicker
$(document).ready(function() {
    if ( $.fn.dataTable.isDataTable( '#filter_tab' ) ) {
    	table_c = $('#filter_tab').DataTable();
		}
		else {
    	table_c = $('#filter_tab').DataTable( {
        "ordering": false,
        "drawCallback": function( settings ) {
        //topRow();
    		},
    		"dom": 'lrtip'
    	});
		}
	
		
		
		$("#add").click(Filworker.insRow);
		
	//	$("#edit").on('click',Filworker.editRow);
		$("#delete").click(Filworker.delData);
		$("#save").click(Filworker.saveData);
		$("#canc").click(Filworker.cncRow);
  	$("#filter_tab tbody").on("click", "tr", Filworker.selRow);
} );


var selected_c;
//var header_c;
var table_c;


var Filworker = {
	
	//insert new row at first row and config it
	insRow : function(){
		if(!$("#add").hasClass("adding")){
			var row = table_c.row.add(["","","","","","",""]).draw().node();
			$(row).addClass("selected").siblings().removeClass("selected");
			
			//reset buttons
		  $("#save").show();
			$("#canc").show();
			$("#edit").hide();
			$("#delete").hide();
			
			//
			Filworker.addRow($(row));
			Filworker.topRow();
	  }
	},
	
	//config the new added row for operating
	addRow: function(J_row) {
		if(J_row) selected_c = J_row;
		else      
			$("#add")
		     .notify("Failed to add a new line!", {gap: 20, arrowShow: false, className: "error", position:"left middle"});//selected_c = $("#filter_tab tbody .selected").first();
		
		if(selected_c.length){
				$("#add").addClass("adding");
				var cells_sel_tab = $("td", selected_c).slice(0, 1);
				var cells_sel_fld = $("td", selected_c).slice(1, 2);
				var cells_inp = $("td", selected_c).slice(2, 5);
				var cells_date = $("td", selected_c).slice(5, 7);
				
				cells_sel_tab.each(function(){
					if($("select", $(this)).length == 0)
						$(this).html("<select id='selectpicker-tab' class='selectpicker'>"+
													"<option data-hidden='true' value=''>Choose the table name...</option>" +
	  											"<option value='donor'>Donor</option>"+
													"<option value='contact'>Contact</option>"+
													"<option value='finance'>Finance</option>"+
													"</select>"
				 								);
				  });
				
				cells_sel_fld.each(function(){
					if($("select", $(this)).length == 0)
						$(this).html("<select id='selectpicker-fld' class='selectpicker'>"
												+"<option class='bs-title-option' value='placeholder'>Choose a Table name first!</option>"
                        + "</select>"	
						);
				});
				
				cells_inp.each(function(){
					if($("input", $(this)).length == 0)
						$(this).html("<input style='width:100%;' value='"+$(this).html().trim()+"'>");
				});
				
				cells_date.each(function(){
					if($("input", $(this)).length == 0)
						$(this).html("<input style='width:100%;' type='text' class='datepicker'>");
				});
				$('.selectpicker').selectpicker();
				$('.datepicker').datepicker({
					format: 'yyyy-mm-dd',
					autoclose: true});
				//config the datepicking
				//Filworker.choDate(cells_date[0], cells_date[1]);
				
			}
		
			//dynamic field select
		$('.selectpicker#selectpicker-tab').change(function(){
							
		    var selected = $(this).find("option:selected").val();
		    $('.selectpicker#selectpicker-fld').find('[value=placeholder]').remove();
		    //alert(selected);
		    switch (selected) {
		      case 'contact':
		        $('.selectpicker#selectpicker-fld').selectpicker('toggle');
		        $('.selectpicker#selectpicker-fld')
							.html("<option data-hidden='true' value=''>Choose the field name...</option>" 
								+'<option value="datetime-contact_date">Contact Date</option>'
								+'<option value="datetime-followup_date">Followup Date</option>'
								+'<option value="none-narrative">Narrative</option>'
								+'<option value="string-created_by">Create by (Person)</option>'
								+'<option value="string-last_modified_by">Last Modified by (Person)</option>'
								+'<option value="datetime-created_at">Created at (Date)</option>'
								+'<option value="datetime-last_modified_at">Last Modified at (Date)</option>')
							.selectpicker('refresh');
		        break;
		        
		      case 'donor':
		        $('.selectpicker#selectpicker-fld').selectpicker('toggle');
		        $('.selectpicker#selectpicker-fld')
							.html("<option data-hidden='true' value=''>Choose the field name...</option>" 
										+'<option value="none-title">Title</option>'
							      +'<option value="none-first_name">First Name</option>'
							      +'<option value="none-last_name">Last Name</option>'
							      +'<option value="none-middle_name">Middle Name</option>'
							      +'<option value="none-salution">Salution</option>'
							      +'<option value="none-email">Email</option>'
							      +'<option value="string-organization">Organization</option>'
							      +'<option value="string-company">Company</option>'
							      +'<option value="none-street_address">Street Address</option>'
							      +'<option value="string-city">City</option>'
							      +'<option value="string-state">State</option>'
							      +'<option value="string-country">Country</option>'
							      +'<option value="none-zipcode">Zip Code</option>'
							      +'<option value="none-home_phone">Home Phone</option>'
							      +'<option value="none-business_phone">Business Phone</option>'
							      +'<option value="string-created_by">Create by (Person)</option>'
							      +'<option value="string-last_modified_by">Last Modified by (Person)</option>'
							      +'<option value="datetime-created_at">Created at (Date)</option>'
							      +'<option value="datetime-last_modified_at">Last Modified at (Date)</option>')
							.selectpicker('refresh');
		        break;
		        
		      case 'finance':
		        $('.selectpicker#selectpicker-fld').selectpicker('toggle');
		        $('.selectpicker#selectpicker-fld')
							.html("<option data-hidden='true' value=''>Choose the field name...</option>" 
										+'<option value="string-type">Type</option>'
						        +'<option value="datetime-date">Date</option>'
						        +'<option value="decimal-amount">Amount</option>'
						        +'<option value="none-description">Description</option>'
						        +'<option value="string-designation">Designation</option>'
						        +'<option value="string-created_by">Create by (Person)</option>'
						        +'<option value="string-last_modified_by">Last Modified by (Person)</option>'
						        +'<option value="datetime-created_at">Created at (Date)</option>'
						        +'<option value="datetime-last_modified_at">Last Modified at (Date)</option>')
							.selectpicker('refresh');
		        break;
		      
		      default:
		        return false;
		    }
			});
	},
	
	cncRow: function(){
        // new row
        if ($("#add").hasClass("adding")){
	        table_c.row(selected_c).remove().draw(false);
            Filworker.reBtn();
        }
        // edit row
        else if($("#edit").hasClass("editing")){
          var butns = $("#actions").html();
	        var row = table_c.row(selected_c)
	        original_row[0] = butns;
	        row.data(original_row).draw();
          Filworker.reBtn();
        }
      
	}
	,
	
	reBtn: function(){
		$("#add").removeClass("adding");
		$("#edit").removeClass("editing");
		$("#add").show();
		$("#edit").show();
		$("#delete").show();
		$("#canc").hide();
		$("#save").hide();
	},
	
	editRow: function(){
		
	},
	
	saveData: function(){
		if(selected_c.length){
		var attr = [];
		var cells_sel_tab = $("td", selected_c).slice(0, 1);
		cells_sel_tab.each(function(){
			attr.push($("select", $(this)).val());
		});
		
		var cells_sel_fld = $("td", selected_c).slice(1, 2);
		cells_sel_fld.each(function(){
			var fld=$("select", $(this)).val().split('-');
			attr.push(fld[1]);
		});
		
		var cells_inp = $("td", selected_c).slice(2, 5);
		cells_inp.each(function(){
			attr.push($("input", $(this)).val());
		});
		
		var cells_date = $("td", selected_c).slice(5, 7);
		cells_date.each(function(){
			attr.push($("input", $(this)).val());
		});
		
		if(attr[0] == ""){ 
			$("#add").notify("Please select the Table.", {gap: 20, arrowShow: false, className: "error", position:"left middle"});
			return false;
		}
		if(attr[1] == ""){ 
			$("#add").notify("Please select the Field.", {gap: 20, arrowShow: false, className: "error", position:"left middle"});
			return false;
		}
		if(selected_c.data("id"))
			$.ajax({
				type: "PUT",
				url: "/filters/" + selected_c.data("id"),
				data: {"attr": attr},
				timeout: 5000,
			    success: function(data, requestStatus, xhrObject){ Filworker.saveRow(data); },
			    error: function(xhrObj, textStatus, exception) {
					$("#add").notify("Failed to save data!", {gap: 20, arrowShow: false, className: "error", position:"left middle"});
			    }
			})
		else
			$.ajax({
				type: "POST",
				url: "/filters/",
				data: {"attr": attr, "id": $("#ReportId").text()},
				timeout: 5000,
			    success: function(data, requestStatus, xhrObject){ Filworker.saveRow(data); },
			    error: function(xhrObj, textStatus, exception) {
					$("#add").notify("Failed to add data!", {gap: 20, arrowShow: false, className: "error", position:"left middle"});
			    }
			})
	}
	},
	
  saveRow: function(data){
	if(data.id) selected_c.data("id", data.id);
	table_c.row(selected_c).data([
		data.table_name,
		data.field_name,
		data.value,
		data.min_value,
		data.max_value,
		data.min_date,
		data.max_date
	]).draw();

	$("#add").notify("Successfully saved!", {gap: 20, arrowShow: false, className: "success", position:"left middle"});
	
	//reset button
	Filworker.reBtn();
	
},

	
	topRow : function(){
		if($("#add").hasClass("adding")){
			selected_c.detach();
			$("#filter_tab tbody").prepend(selected_c);
		//selected_c.addClass("selected").siblings().removeClass("selected");
		}
	},
	
	selRow: function(event){
		if (!$("#add").hasClass("adding") && !$("#edit").hasClass("editing")){
			if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table_c.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
		}
	},
	
	delRow: function(){

	  table_c.row('.selected').remove().draw(false);
	  $("#add").notify("Successfully deleted!", {gap: 20, arrowShow: false, className: "success", position:"left middle"});
	},
	
	delData :function(){
		selected_c = $("#filter_tab tbody .selected")
		if(selected_c.length){
			var sure = confirm("Are you Sure?");
			if (sure){
				selected_c.each(function(){
					if ($(this).data("id"))
							$.ajax({
								type: "DELETE",
								url : "/filters/"+$(this).data("id"),
								timeout: 5000,
								success: function(data, requestStatus, xhrObject){Filworker.delRow();},
								error: function(xhrObj, textStatus, exception){
									$("#add").notify("Failed to delete data!", {gap: 20, arrowShow: false, className: "error", position:"left middle"});
								}
							})
				});
			}
		}
	},
	
	choDate : function(a,b){
			//var now = new Date();
			
			var d1 = a.datepicker({
					format: 'yyyy-mm-dd',
					autoclose: true
			});
		
			var d2 = b.datepicker({
					format: 'yyyy-mm-dd',
					autoclose: true
			})
			
			/*		
			a
			.datepicker()
			.on('changeDate', function(e) {
			if (e.date.valueOf() > b.date.valueOf()) {
		        var newDate = new Date(a.date)
		        newDate.setDate(newDate.getDate() + 1);
		        b.setValue(newDate);
	      	}
      a.hide();
      b[0].focus();
    })	
	
			b.on('changeDate', function(evnt) {
					if (evnt.date.valueOf() < d1.date.valueOf()){
						alert("Date Max should greater than Date Min")
						var d1Date = new Date(d1.date.valueOf())
			       d1Date.setDate(d1Date.getDate() + 1);
			        d2.setValue(d1Date);
					}
	      	d2.hide();
	    })*/
	},
	
	
	
	
	
	
};
 
 /*
function fixHeader(){
	if($("#contact-tab", $(this)).length){
		setTimeout(function() {
			if($(".fixedHeader").length == 0 && $("#contact").hasClass("active")){
				header_c = new fixHeader(table_c);
				$(window).resize(function(){ header_c._fnUpdateClones(true) })
			}
		}, 1000);
	} else $(".fixedHeader").remove();
}
*/




