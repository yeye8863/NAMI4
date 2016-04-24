class FinancesController < ApplicationController
    def create
        a = params[:attr]
        @donor = Donor.find(params[:id])
        @finance = @donor.finances.build({
            :type => a[0],
            :date => a[1],
            :amount => a[2],
            :description => a[3],
            :designation => a[4],
            #:contact => a[5],
            :created_by => User.find(session[:user_id]).username,
            :last_modified_by => User.find(session[:user_id]).username
        })
        @finance.save!
        jdata={
            :id => @finance.id,
            :val => [@finance.type,
                     @finance.date,
                     @finance.amount,
                     @finance.description,
                     @finance.designation,
                     @finance.contact
            ]}
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
            :type => a[0],
            :date => a[1],
            :amount => a[2],
            :description => a[3],
            :designation => a[4],
           # :contact => a[5],
            :created_by => User.find(session[:user_id]).username,
            :last_modified_by => User.find(session[:user_id]).username
        })
        jdata={
            :id => @finance.id,
            :val => [@finance.type,
                     @finance.date,
                     @finance.amount,
                     @finance.description,
                     @finance.designation,
                     @finance.contact
            ]}
        render :json => jdata if request.xhr?
        
    end
end
