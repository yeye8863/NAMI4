class AddedcontactController < ApplicationController
  def show
    id = params[:id]
    @contact = Contact.find(id)
    #debugger
    render(:partial => 'addedcontact_details', :object => @contact) if request.xhr?
  end
end
