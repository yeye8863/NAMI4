var donorInfo = {
  setup: function(){
    $('#donorInfo').on('ajax:success',function(event,data,status,xhr){
      event.preventDefault();
      $('#summary-table tbody').html(data);
      $("#basic-submit").notify("Successfully saved", {className: "success", position:"left middle"});
    });
    $('#donorInfo').on('ajax:error',function(event,xhr,status,error){
      event.preventDefault();
      $("#basic-submit").notify("Error occurred, please try later...", {className: "error", position:"middle middle"});
    });
  }
};

$(donorInfo.setup);

var SearchScope = {
  select_scope : function() {
   $('#individual').toggle();
   $('#organization').toggle();
  },
  setup: function() {
    SearchResult.setup();
    $('#scope_link').change(SearchScope.select_scope);
  }
}

var SearchResult = {
  setup : function() {
    $('#search_box').submit(SearchResult.getResult);
  },
  getResult : function() {
    $(document).on('ajax:success',function(event,data,status,xhrObj){
      $('#search_result').html(data);
    });
  }
};
$(document).ready(SearchScope.setup);
