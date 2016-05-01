class ReportsController < ApplicationController
helper_method :sort_column, :sort_direction
    before_filter :authorize
    
    def index
        @report_records = Report.search_by(params[:report_record]).order(sort_column + " " + sort_direction).paginate(:per_page => 4, :page => params[:page])
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
    
    private
    def sort_column
        Donor.column_names.include?(params[:sort]) ? params[:sort] : "created_at"
    end
    def sort_direction
        %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
    end
    
    
end