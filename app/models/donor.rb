class Donor < ActiveRecord::Base
    attr_accessible :first_name, :last_name, :company, :organization
    has_many :finances
    has_many :contacts

end
