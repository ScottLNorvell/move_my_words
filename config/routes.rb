MoveMyWords::Application.routes.draw do
  resources :users, only: [:index, :show, :update]

  devise_for :users, controllers: {sessions: 'sessions'}

 	resources :move_my_posts, only: [:create, :update]

 	get 'move_my_posts/:id/:game' => 'move_my_posts#show', as: 'posts_game'

  root to: 'welcome#index'
end
