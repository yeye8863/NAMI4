class ReportsController < ApplicationController

    before_action :check_authorization
    
    def index
      @reports = Report.all

    end

    def show
      id = params[:id] 
      @report = Report.find(id) 
      @filters = @report.filters
      
      configs={}
      @filters.each do |filter|
        if !configs.has_key? filter.table
          configs[filter.table_name] = {}
        end
        configs[filter.table_name][filter.field_name]={}
        configs[filter.table_name][filter.field_name][:value]=filter.value
        configs[filter.table_name][filter.field_name][:min_value]=filter.min_value
        configs[filter.table_name][filter.field_name][:max_value]=filter.max_value
        configs[filter.table_name][filter.field_name][:min_date]=filter.min_date
        configs[filter.table_name][filter.field_name][:max_date]=filter.max_date
      end
      
      @result = Report.generate(configs)
      if configs.keys.count == 1
        model = configs.keys[1].singularize.classify.constantize
        records = model.all
        configs.each do |table,field|
          field.each do |attrname,value|
            case attrname
            when 'value'
              records.where(field+'='+value)
            when 'min_value'
              records.where(field+'>='+value)
            when 'max_value'
              records.where(field+'<='+value)
            when 'min_date'
              records.where(field+'>='+value)
            when 'max_date'
              records.where(field+'>='+value)
            end
          end
        end
      elsif configs.keys.count == 2
      
      elsif configs.keys.count == 3
      
      end
    end
    
    def new 
      @report = Report.new
    end
    
    def create
      @report = Report.create!(params[:report])
      flash[:notice] = "#{@report.title} was successfully created."
      redirect_to edit_report_path(@report.id)
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
      @filters = @report.filters
      @user = User.find(session[:user_id])
    end
    
    def update
      report = params[:report]
      @report = Report.find(report[:id])
      report.delete('id')
      respond_to do |format|
        if @report.update_attributes(report)
          format.js {render js: "$('#backbtn').notify('Successfully saved', {className: 'success', position:'right middle'});"}
          format.html{ redirect_to reports_path, :notice => "successfully updated" }
        end
      end
      @report.last_modified_by = User.find(session[:user_id])
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
    
    private
    def sort_column
        Donor.column_names.include?(params[:sort]) ? params[:sort] : "created_at"
    end
    def sort_direction
        %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
    end
    
    
end