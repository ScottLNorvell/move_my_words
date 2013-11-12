MoveMyWords::Application.routes.draw do
  devise_for :users, controllers: {sessions: 'sessions'}

  resources :users, only: [:index, :show]

 	resources :move_my_posts, only: [:create, :update]

  root to: 'welcome#index'
end
