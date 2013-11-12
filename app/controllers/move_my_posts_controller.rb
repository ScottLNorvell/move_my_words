class MoveMyPostsController < ApplicationController
	
	def create
		move_my_post = current_user.move_my_posts.create params[:move_my_post]
		render json: move_my_post
	end

	def update
		move_my_post = MoveMyPost.find params[:id]
		move_my_post.update_attributes params[:move_my_post]
	end

end