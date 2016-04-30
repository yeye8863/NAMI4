class FiltersController < ApplicationController
    def index
        
    end

    def show
        
    end
    
    def new 
        @filter = Filter.new
    end
    
    def create
        @report = Report.find(params[:id])
        flash[:notice] = "#{@filter} was successfully created."
        redirect_to new_report_path
    end
    
    def edit
        
    end
    
    
    def update
        
    end
    
    def destroy
        id = params[:id]
        @report_record = Report.find(id)
        flash[:notice] = "#{@report_record.title} is deleted."
        @report_record.destroy
        redirect_to reports_path
    
    end
end