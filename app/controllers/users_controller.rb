class UsersController < ApplicationController

    def new
    end

	def create
        user = User.new(params[:user])
	    if user.save
	        session[:user_id] = user.id
	        flash[:notice] = "New user #{user.username} created"
    	    redirect_to '/'
	    else
	        flash[:notice] = "Something is wrong!"
	        redirect_to 'signup'
	    end
	end

end
