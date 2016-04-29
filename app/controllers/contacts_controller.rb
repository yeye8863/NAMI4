class ContactsController < ApplicationController
    def create
        a = params[:attr]
        @donor = Donor.find(params[:id])
        @contact = @donor.contacts.build({
            :contact_date => a[0],
            :followup_date => a[1],
            :narrative => a[2],
            :created_by => User.find(session[:user_id]).username,
            :last_modified_by => User.find(session[:user_id]).username
        })
        @contact.save!
        if a[3] != "" && !a[3].nil?
            fin = Finance.find(a[3])
            if(!fin.contact.nil?)
                original = fin.contact.id
            end
            @contact.update_attributes!({:finances => fin})
        end
        jdata={
            :id => @contact.id,
            :val => [@contact.contact_date,
                     @contact.followup_date,
                     @contact.narrative
            ],
            :no_foreign => @contact.finances.nil?,
            :original => original,
            :info => [
                     @contact.created_by,
                     @contact.last_modified_by
            ]
        }
        render :json => jdata if request.xhr?
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
            :last_modified_by => User.find(session[:user_id]).username
        })
        if a[3] != "" && !a[3].nil?
            fin = Finance.find(a[3])
            if(!fin.contact.nil?)
                original = fin.contact.id
            end
            @contact.update_attributes!({:finances => fin})
        end
        @contact.save!
        jdata={
            :id => @contact.id,
            :val => [@contact.contact_date,
                     @contact.followup_date,
                     @contact.narrative
            ],
            :original => original,
            :no_foreign => @contact.finances.nil?,
            :info => [
                     @contact.created_by,
                     @contact.last_modified_by
            ]
        }
        render :json => jdata if request.xhr?
    end
    
    def show
        @contact = Contact.find(params[:id])
        if @contact.finances.nil?
            jdata = ""
        else
            jdata = @contact.finances.id
        end
        render :json => [jdata] if request.xhr?
    end
end





