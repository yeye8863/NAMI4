require 'rails_helper'
require 'spec_helper'

RSpec.describe UsersController, type: :controller do
    describe '#new' do
        it 'creates a new user' do
            get :new 
            response.status.should be(200)
        end
    
    describe '#create' do
        it '' do
            
        end
    end
    
    
    end
end
