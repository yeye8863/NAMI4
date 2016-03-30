class SessionsController < ApplicationController
    
    def login
        username = params[:username]
        passwd = params[:passwd]
        
        if User.log_in_with(username,passwd)
            session[:user] = User.find_by_username(username).id
            render 'homepage'
        else
            flash[:notice] = "Unable to verify identity, please try again."
            render 'index'
        end
    end
    
    
    
    
end
