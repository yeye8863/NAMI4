class Donor < ActiveRecord::Base
    attr_accessible :first_name, :last_name, :company, :organization
    has_many :finances
    has_many :contacts
    
    def self.search_by inputs
        if inputs != nil 
           inputs.delete_if {|key, value| value.empty? }
           inputs.each do |key, value|
               value.capitalize! 
           end
        end
        
        return Donor.where(inputs)
    end

end
