require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
    describe "user logging in" do
        it "should route /login to sessios#create" do
            expect(:post => "/login").to route_to(
            :controller => "sessions",
            :action => "create"
            )
        end
        describe "after valid routing" do
            describe "on successful finding the user" do
                before :each do
                    @user1 = double('user1',:id => 1,:username => 'aaa', :password => '111')
                    allow(User).to receive(:find_by_username).with(@user1.username).and_return(@user1)
                end
                describe " and after calling model to get the user instance" do
                    describe "on successful log in" do
                        before :each do
                            allow(@user1).to receive(:authenticate).with(@user1.password).and_return(true)
                            post :create, {:session => {:username => 'aaa', :password => '111'}}
                        end
                        it "the session should be set up" do
                            expect(session[:user_id]).to eq(@user1.id)
                        end
                        it "and should be redirected to homepage of this user" do
                            expect(response).to redirect_to('/index')
                        end
                    end
                    describe "on failed log in" do
                        before :each do
                            allow(@user1).to receive(:authenticate).with(@user1.password).and_return(false)
                            post :create, {:session => {:username => 'aaa', :password => '111'}}
                        end
                        it "should be redirected to log in page on failure log in" do
                            expect(response).to redirect_to('/login')
                        end
                    end
                end
            end
            describe "on failed finding the user" do
                before :each do
                    allow(User).to receive(:find_by_username).with('bbb').and_return(nil)
                    post :create, {:session => {:username => 'bbb', :password => '111'}}
                end
                it "should redirect to login page if the user does not exist" do
                    expect(response).to redirect_to('/login')
                end
            end
        end
    end
end
