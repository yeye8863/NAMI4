class FinancesController < ApplicationController
    def create
        a = params[:attr]
        @donor = Donor.find(params[:id])
        @finance = @donor.finances.build({
            :_type => a[0],
            :date => a[1],
            :amount => a[2],
            :description => a[3],
            :designation => a[4],
            :created_by => User.find(session[:user_id]).username,
            :last_modified_by => User.find(session[:user_id]).username
        })
        
        if a[5] != "" && !a[5].nil?
            @finance.contact = Contact.find(a[5])
        end
        @finance.save!
        jdata={
            :id => @finance.id,
            :val => [@finance._type,
                     @finance.date,
                     @finance.amount,
                     @finance.description,
                     @finance.designation
            ],
            :no_foreign => @finance.contact.nil?,
            :info => [
                     @finance.created_by,
                     @finance.last_modified_by
            ]
        }
        render :json => jdata if request.xhr?
    end

    def destroy
        @finance = Finance.find(params[:id])
        @finance.destroy
        render :nothing => true
    end
    
    def update
        @finance = Finance.find(params[:id])
        a = params[:attr]
        @finance.update_attributes!({
            :_type => a[0],
            :date => a[1],
            :amount => a[2],
            :description => a[3],
            :designation => a[4],
            :created_by => User.find(session[:user_id]).username,
            :last_modified_by => User.find(session[:user_id]).username
        })
        if a[5] != "" && !a[5].nil?
            @finance.update_attributes!({:contact => Contact.find(a[5])})
        end
        jdata={
            :id => @finance.id,
            :val => [@finance._type,
                     @finance.date,
                     @finance.amount,
                     @finance.description,
                     @finance.designation
            ],
            :no_foreign => @finance.contact.nil?,
            :info => [
                     @finance.created_by,
                     @finance.last_modified_by
            ]
        }
        render :json => jdata if request.xhr?
        
    end
    
    def show
        @finance = Finance.find(params[:id])
        render :json => [@finance.contact.id] if request.xhr?
    end
end
