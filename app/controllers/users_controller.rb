class UsersController < ApplicationController

  	def new
  		@new_user = User.new()
  	end

	def create
		@new_user = User.new(params[:user])
		if Access.exists?(:email => params[:user][:email])
			#valid access email
			if @new_user.save # password match
		  		session[:user_id] = @new_user.id
		    	flash[:notice] = "You have signed up successfully.\n Please login with your account information."
	      		redirect_to root_path
		  	else
		    	redirect_to new_user_path
		  	end
		else # invalid access email
			#debugger
			flash[:notice] = "Unauthrized email address."
			redirect_to new_user_path
		end
	end
	
	def index
		
	end
end