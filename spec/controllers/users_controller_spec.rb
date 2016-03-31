require 'rails_helper'
require 'spec_helper'

RSpec.describe UsersController, type: :controller do
    
    
    describe '#new' do
        it 'route to new page' do
            get :new 
            response.status.should be(200)
        end
    
    describe '#create' do
    before :each do
        @fake_user = double('user',:email => 'aaa@gmail.com')
        allow(Access).to receive(:exists?).with(@fake_user.email) {@fake_user} 
    end
    
    
        it 'checks the access of the new user' do
            expect(Access.exists?(@fake_user.email)).to eq(@fake_user)  
        end
        #happy path: this new user has access to signup
        it 'saves user data' do
          pending
        end
        
        it 'turn to login page' do
            pending
        end
        
        it 'sets a notice saying "You have signed up successfully."' do
         pending
        end
        
        #sad path: this new user does not have access to signup
        it 'stays on signup page' do
            pending
        end
        
        it 'sets a notice saying "Incorrect access code."' do
            pending
        end
        
        #sad path: this new user enters different password when confirmation
        it 'stays on signup page' do
            pending
        end
        
        it 'sets a notice saying "Error occured."' do
            pending
        end
        
    end
    
    
    end
end
