class Filter < ActiveRecord::Base
  belongs_to :report
  attr_accessible :table_name, :field_name, :value, :min_value, :max_value, 
  :min_datetime, :max_datetime, :created_by, :created_at, :last_modified_by,
  :last_modified_at, :report
end
