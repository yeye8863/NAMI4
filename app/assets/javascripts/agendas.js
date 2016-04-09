var AgendaInfo = {
  setup: function(){
    $('#agenda-table td a').click(AgendaInfo.getAgendaInfo);
    return false
  },
  getAgendaInfo: function(event){
    event.preventDefault();
    $.ajax({type:'GET',
            url: $(this).attr('href'),
            timeout: 5000,
            success: AgendaInfo.showAgendaInfo,
            error: function(xhrobj,textStatus,exception){
              alert('Error!');
            }
    });
    return false;
  },
  showAgendaInfo: function(data,request,xhrobj){
    $('#agendaInfo .modal-body').html(data);
    $('#agendaInfo').modal();
    return false;
  },
  hideAgendaInfo: function(){
    return false;
  }
};

$(AgendaInfo.setup);
