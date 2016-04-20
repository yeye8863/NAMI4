class Report < ActiveRecord::Base
    has_many :filters
    attr_accessible :title, :description, :last_run, :created_by, :created_at, :last_modified_by, :last_modified_at
    
    def self.search_by inputs
        if inputs != nil 
           inputs.delete_if {|key, value| value.empty? }
           inputs.each do |key, value|
               value.downcase!
           end
          
        search_term = [inputs.keys.map{ |key| "#{key} LIKE ?"}.join(' AND ')] +  inputs.values.map { |val| "%#{val}%" } 
        end
        
#    def self.search_by (search)
#        if search
#           where('name LIKE ?', "%#{search}%")
#        else
#           scoped
#        end
#    end
        
        @report_records =  Report.where(search_term)
    end

end
