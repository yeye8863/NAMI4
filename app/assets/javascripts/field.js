$(document).ready(function(){
	$('#selectpicker-tab').on('change', function(){
		/*
		$('#selectpicker-fld')
					.html("<option data-hidden='true' value=''>Choose the field name...</option>" +
						'<option value="datetime_contact_date">Contact Date</option>'
						+'<option value="datetime_followup_date">Followup Date</option>'
						+'<option value="none_narrative">Narrative</option>'
						+'<option value="string_created_by">Create by (Person)</option>'
						+'<option value="string_last_modified_by">Last Modified by (Person)</option>'
						+'<option value="datetime_created_at">Created at (Date)</option>'
						+'<option value="datetime_last_modified_at">Last Modified at (Date)</option>')
					.selectpicker('refresh');*/
					
    var selected = $(this).find("option:selected").val();
    alert(selected);
	});
	});