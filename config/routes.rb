MoveMyWords::Application.routes.draw do
  devise_for :users, controllers: {sessions: 'sessions'}

  resources :users, only: [:index, :show, :update]

 	resources :move_my_posts, only: [:create, :update, :destroy]

 	get 'move_my_posts/:id/:game' => 'move_my_posts#show', as: 'posts_game'

  root to: 'welcome#index'
end
