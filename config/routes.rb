Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root :to => 'sessions#new'
  resources :users
  # these routes are for showing users a login form, logging them in, and logging them out.
  get 'login' => 'sessions#new', :as => 'new_login'
  post 'login' => 'sessions#create', :as => 'login'
  get 'logout' => 'sessions#destroy', :as => 'logout'

  get 'homepage' => 'users#index', :as => 'homepage'
  
  resources :donors
  resources :reports

  get 'dashboard' => 'dashboards#index', :as => 'dashboard'
end
