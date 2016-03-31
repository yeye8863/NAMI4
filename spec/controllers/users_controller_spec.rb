require 'rails_helper'
require 'spec_helper'

RSpec.describe UsersController, type: :controller do
    
    describe '#new' do
    before :each do
        @fake_user = double('user')
        allow(@fake_user).to receive(:new) {@fake_user} 
    end
    
        it 'route to "/new" page' do
            get :new 
            response.status.should be(200)
        end
        
        it 'create a new user' do
            expect(@fake_user.new).to eq(@fake_user) 
        end
    end
    
    describe '#create' do
        before :each do
            @fake_user = double(:id => '1',:email => 'aaa@gmail.com')
            @user = {:id => '1', :email => 'aaa@gmail.com'}
            allow(User).to receive(:new).with(@user){@fake_user}
        end
        describe 'after finding the user email in access table successfully' do
            before :each do
                allow(Access).to receive(:exists?).with(:email => @fake_user.email) {true}
            end
            describe 'after saving the user successfully' do
                before :each do
                    allow(@fake_user).to receive(:save).and_return(true)
                    post :create, {:user => @user}
                end
                it 'should set up the session' do
                    expect(session[:user_id]).to eq(@fake_user.id)
                end
                it 'should redirect to login page' do
                    expect(response).to redirect_to('/login')
                end
            end
            
            describe 'after saving the user unsuccessfully' do
                before :each do
                    allow(@fake_user).to receive(:save) {false} 
                    post :create, {:user => @user}
                end
                it 'should render the new template' do
                    expect(response).to render_template('new')
                end
            end
        end
        describe 'after finding the user email in access table unsuccessfully' do
            before :each do
                allow(Access).to receive(:exists?).with(:email => @fake_user.email) {false}
                post :create, {:user => @user}
            end
            it 'should set up the flash' do
                expect(flash[:notice]).to eq("Unauthrized email address.")
            end
            it 'should render the new template' do
                expect(response).to render_template('new')
            end
        end
    
    end
end

