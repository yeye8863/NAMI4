Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root :to => 'sessions#new'
  
  # these routes are for showing users a login form, logging them in, and logging them out.
  get 'login' => 'sessions#new', :as => 'new_login'
  post 'login' => 'sessions#create', :as => 'login'
  get 'logout' => 'sessions#destroy', :as => 'logout'
  get 'homepage' => 'users#homepage', :as => 'homepage'
  get 'donorSummary/:id' => 'donors#showSummary', :as => 'donorSummary'
  get 'donorContact' => 'donors#showByContact', :as => 'donorContact'
  get 'dashboard' => 'dashboards#index', :as => 'dashboard'
  get 'dashboard/donor/:id' => 'dashboards#viewDonor', :as=>'dashboardDonor'
  
  resources :users
  resources :accesses
  resources :donors
  resources :reports
  resources :contacts
  resources :finances
  resources :agendas
  resources :contact_people
  resources :reports
  resources :filters
  
end
