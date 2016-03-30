require 'rails_helper'
require 'spec_helper'

RSpec.describe UsersController, type: :controller do
    
    
    describe '#new' do
        it 'creates a new user' do
            get :new 
            response.status.should be(200)
        end
    
    
    before :each do
        @fake_user = double('user')
        @fake_email = double('email')
        allow(User).to receive(:save) {true}
        allow(Access).to receive(:exists?).with('email') {true} 
    end
    
    describe '#create' do
        
        
        it 'checks the access of the new user' do
            
        end
        #happy path: this new user has access to signup
        it 'saves user data' do
        
        end
        
        it 'turn to login page' do
        
        end
        
        it 'sets a notice saying "You have signed up successfully."' do
        
        end
        
        #sad path: this new user does not have access to signup
        it 'stays on signup page' do
            
        end
        
        it 'sets a notice saying "Incorrect access code."' do
            
        end
        
        #sad path: this new user enters different password when confirmation
        it 'stays on signup page' do
        
        end
        
        it 'sets a notice saying "Error occured."' do
            
        end
        
    end
    
    
    end
end
