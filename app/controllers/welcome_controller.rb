class WelcomeController < ApplicationController
	def index
		if user_signed_in?
			@placeholder = "Welcome #{current_user.created_at > 12.hours.ago ? "" : "Back"} #{name_or_email current_user}!"
			@new_move_my_post = MoveMyPost.new
			@user = current_user
			@user_move_my_posts = current_user.move_my_posts.order "created_at DESC"
			render 'users/show'
		else
			@new_user = User.new
		end
	end
end