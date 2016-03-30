class UsersController < ApplicationController

  def new
  end

	def create
		
		if Access.exists?(:email => params[:user][:email])
			#debugger
			user = User.new(params[:user])
		  if user.save
		  	session[:user_id] = user.id
		    flash[:notice] = "You have signed up successfully.\n Please login with your account information."
	      redirect_to '/login'
		  else
		    flash[:notice] = "Error occured.\n Please contact the administrator."
		    redirect_to '/signup'
		  end
		else
			#debugger
			flash[:notice] = "Incorrect access code"
			redirect_to '/signup'
		end
	end

end
