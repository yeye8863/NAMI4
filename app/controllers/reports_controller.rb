class ReportsController < ApplicationController
    before_action :check_authorization
    
    def index
        @report_records = Report.search_by(params[:report_record]).paginate(:per_page => 4, :page => params[:page])
        render(:partial => 'search_result', :object => @report_records) if request.xhr?
    end

    def show
        id = params[:id] 
        @report = Report.find(id) 
        @report_filter = {
        	'Table' => '25%',
        	'Field' => '25%',
        	'Value' => '10%',
        	'Amount Min' => '10%',
        	'Amount Max' => '10%',
        	'Date Min' => '10%',
        	'Date Max' => '10%'
        }
        @filters = Filter.where(:report => id)
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
        @report = Report.find(params[:id])
        @report_filter = {
        	'Table' => '25%',
        	'Field' => '25%',
        	'Value' => '10%',
        	'Amount Min' => '10%',
        	'Amount Max' => '10%',
        	'Date Min' => '10%',
        	'Date Max' => '10%'
        }
        @filters = Filter.where(:report => @report.id)
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
    
    def check_authorization
      unless current_user.function.include? 'report management'
          flash[:notice]="Sorry, authorization check failed!"
          redirect_to homepage_path
      end
    end
end