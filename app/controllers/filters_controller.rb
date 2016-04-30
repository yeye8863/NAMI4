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
        @report = Report.find(params[:id]);
        @filter = @report.filters.build({
            :table_name => a[0],
            :field_name => a[1],
            :value => a[2],
            :min_value => a[3],
            :max_value => a[4],
            :min_date => a[5],
            :max_date => a[6]
        })
        @filter.save!
        render :json => @filter if request.xhr?
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