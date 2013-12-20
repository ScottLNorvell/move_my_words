class MoveMyPostsController < ApplicationController
	
	def show
		@move_my_post = MoveMyPost.find params[:id]
		@new_move_my_post = MoveMyPost.new
		@game = Game.find_by_slug params[:game]
		unless user_signed_in?
			@new_user = User.new
		end
	end

	def create
		move_my_post = current_user.move_my_posts.create params[:move_my_post]
		html_string = render_to_string move_my_post
		respond_to do |format|
			format.html { render move_my_post }
			format.json { render json: { post: move_my_post, html: html_string } }
		end
	end

	def update
		move_my_post = MoveMyPost.find params[:id]
		move_my_post.update_attributes params[:move_my_post]
		render json: move_my_post
	end

	def destroy
		move_my_post = MoveMyPost.find params[:id]
		move_my_post.destroy
		render json: move_my_post
	end

end