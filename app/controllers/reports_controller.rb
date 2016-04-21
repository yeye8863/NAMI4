class ReportsController < ApplicationController
    before_filter :authorize
    
    def index
        @report_records = Report.search_by(params[:report_record]).paginate(:per_page => 5, :page => params[:page])
        render(:partial => 'search_result', :object => @report_records) if request.xhr?
    end

    def show
        id = params[:id] 
        @report_record = Report.find(id) 
    end
    
    def new 
        @report = Report.new
    end
    
    def create
        @report = Report.create!(params[:report])
        flash[:notice] = "#{@report.title} was successfully created."
        redirect_to report_path(@report.id)
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