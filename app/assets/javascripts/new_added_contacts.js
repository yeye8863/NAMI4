var AddedDonorInfo = {
  setup: function(){
    $('#ind td a').click(AddedDonorInfo.getAddedDonorInfo);
    return false
  },
  getAddedDonorInfo: function(event){
    event.preventDefault();
    $.ajax({type:'GET',
            url: $(this).attr('href'),
            timeout: 5000,
            success: AddedDonorInfo.showAddedDonorInfo,
            error: function(xhrobj,textStatus,exception){
              alert('Error!');
            }
    });
    return false;
  },
  showAddedDonorInfo: function(data,request,xhrobj){
    $('#addedDonorInfo .modal-body').html(data);
    $('#addedDonorInfo').modal();
    return false;
  },
  hideAddedDonorInfo: function(){
    return false;
  }
};

$(AddedDonorInfo.setup);

var AddedContactPersonInfo = {
  setup: function(){
    $('#org td a').click(AddedContactPersonInfo.getAddedContactPersonInfo);
    return false
  },
  getAddedContactPersonInfo: function(event){
    event.preventDefault();
    $.ajax({type:'GET',
            url: $(this).attr('href'),
            timeout: 5000,
            success: AddedContactPersonInfo.showAddedContactPersonInfo,
            error: function(xhrobj,textStatus,exception){
              alert('Error!');
            }
    });
    return false;
  },
  showAddedContactPersonInfo: function(data,request,xhrobj){
    $('#addedContactPersonInfo .modal-body').html(data);
    $('#addedContactPersonInfo').modal();
    return false;
  },
  hideAddedContactPersonInfo: function(){
    return false;
  }
};

$(AddedContactPersonInfo.setup);