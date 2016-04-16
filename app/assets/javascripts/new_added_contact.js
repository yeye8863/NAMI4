var AddedcontactInfo = {
  setup: function(){
    $('#addedcontact-table td a').click(AddedcontactInfo.getAddedcontactInfo);
    return false
  },
  getAddedcontactInfo: function(event){
    event.preventDefault();
    $.ajax({type:'GET',
            url: $(this).attr('href'),
            timeout: 5000,
            success: AddedcontactInfo.showAddedcontactInfo,
            error: function(xhrobj,textStatus,exception){
              alert('Error!');
            }
    });
    return false;
  },
  showAddedcontactInfo: function(data,request,xhrobj){
    $('#addedcontact .modal-body').html(data);
    $('#addedcontactInfo').modal();
    return false;
  },
  hideAddedcontactInfo: function(){
    return false;
  }
};

$(AddedcontactInfo.setup);
