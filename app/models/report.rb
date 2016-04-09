class Report < ActiveRecord::Base
    has_many :filters
    attr_accessible :title, :description, :last_run, :created_by, :created_at, :last_modified_by, :last_modified_at
    

end
