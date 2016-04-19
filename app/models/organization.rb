class Organization < ActiveRecord::Base
    has_many :finances
    has_many :contact_people
    has_many :contacts, :through => :contact_people
    
    attr_accessible :name, :street_address, :city, :state, :country, :zipcode, :fax, :created_by, :last_modified_by
    
    def self.search_by inputs
        if inputs != nil 
           inputs.delete_if {|key, value| value.empty? }
           inputs.each do |key, value|
               value.downcase!
           end
           search_term = [inputs.keys.map{ |key| "#{key} LIKE ?"}.join(' AND ')] +  inputs.values.map { |val| "%#{val}%" }
        end
        @donors =  Organization.where(search_term)
    end
end
