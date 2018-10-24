Rails.application.routes.draw do
  resources :things
  devise_for :users

  root 'things#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
