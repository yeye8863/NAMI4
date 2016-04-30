//$("#report_records").html("<%= escape_javascript(render("reports")) %>");
var viewResult = {
  setup : function() {
    $('#search_result th a, #search_result .pagination a').click(viewResult.render);
  },
  render : function(){
    $(document).on('ajax:success',function(event,data,status,xhrObj){
      $('#search_result').html(data);
    });
  }
};
$(document).ready(viewResult.setup);