class User < ActiveRecord::Base
    attr_accessible :username, :email, :password, :password_confirmation
    has_secure_password
    
    ######## Log in with encrypted password ###########
 #   def self.log_in_with(user,passwd)
 #       User.find_by_username(username).try(:authenticate, passwd)
 #   end
end
