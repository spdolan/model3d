Rails.application.routes.draw do
  get 'home/index'
  resources :things
  devise_for :users

  get "/assets/jscad_examples"
  get "/images/:id" => "jscad#image"
  root 'home#index'
  get 'home/stamp'
  get 'home/keychain'
  get 'home/about'
  get 'stamp' => 'home#stamp'
  get 'keychain' => 'home#keychain'
  get 'magnet' => 'home#magnet'
  get 'about' => 'home#about'
  get 'my_things' => 'home#my_things'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
