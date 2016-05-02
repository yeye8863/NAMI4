class Report < ActiveRecord::Base
    has_many :filters
    attr_accessible :title, :description, :last_run, :created_by, :created_at, :last_modified_by, :last_modified_at
    
    def generate(configs)
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
end
