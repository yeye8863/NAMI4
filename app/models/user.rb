class User < ActiveRecord::Base
    attr_accessible :username, :email, :password, :password_confirmation, :first_name, :last_name
    has_secure_password
    
    #validation
    validates :username, :presence => true, :uniqueness => { case_sensitive: false }
    validates :password, :confirmation => true
    validates :password_confirmation, :presence => true
    validates :email, :presence => true
    validates :first_name, :presence => true
    validates :last_name, :presence => true

    ######## Log in with encrypted password ###########
 #   def self.log_in_with(user,passwd)
 #       User.find_by_username(username).try(:authenticate, passwd)
 #   end
end
