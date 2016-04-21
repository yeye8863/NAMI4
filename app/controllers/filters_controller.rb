class FiltersController < ApplicationController
    before_filter :authorize
    
    def index
        
    end

    def show
        
    end
    
    def new 
        @filter = Filter.new
    end
    
    def create
        a = params[:attr]
        @donor = Donor.find(params[:id]);
        @contact = @donor.contacts.build({
            :contact_date => a[0],
            :followup_date => a[1],
            :narrative => a[2]
        })
        @contact.save!
        render :json => @contact if request.xhr?
    end
    
    def update
        @contact = Contact.find(params[:id])
        a = params[:attr]
        @contact.update_attributes!({
            :contact_date => a[0],
            :followup_date => a[1],
            :narrative => a[2]
        })
        render :json => @contact if request.xhr?
    end
    
    def destroy
        @contact = Contact.find(params[:id])
        @contact.destroy
        render :nothing => true
    end
end