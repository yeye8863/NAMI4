class ContactsController < ApplicationController
    def create
        a = params[:attr]
        @donor = Donor.find(params[:id]);
        @contact = @donor.contacts.build({
            :contact_date => a[0],
            :followup_date => a[1],
            :narrative => a[2],
            :created_by => a[3],
            :last_modified_by => a[4],
        })
        @contact.save!
        render :json => @contact.id if request.xhr?
    end

    def destroy
        @contact = Contact.find(params[:id])
        @contact.destroy
        render :nothing => true
    end
    
    def update
        @contact = Contact.find(params[:id])
        a = params[:attr]
        @contact.update_attributes!({
            :contact_date => a[0],
            :followup_date => a[1],
            :narrative => a[2],
            :created_by => a[3],
            :last_modified_by => a[4],
        })
        render :nothing => true
    end
end