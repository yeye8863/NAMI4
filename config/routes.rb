Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
 # root 'index'
  root :to => 'sessions#new'
  #get  '/users' => 'users#index'
  #get  '/users/new' => 'users#new'
  #post '/users' => 'users#create'
  #resource :users
  # these routes are for showing users a login form, logging them in, and logging them out.
  get 'login' => 'sessions#new'
  post 'login' => 'sessions#create'
  get 'logout' => 'sessions#destroy'

  get 'signup' => 'users#new'
  post 'users' => 'users#create'


end
