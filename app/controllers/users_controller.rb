
class UsersController < ApplicationController
	def index
		@users = User.all 
	end

	def show
		@new_move_my_post = MoveMyPost.new
		@user = User.find params[:id]
		@user_move_my_posts = @user.move_my_posts.order "created_at DESC"
		if @user == current_user
			@placeholder = "Welcome #{@user.created_at > 12.hours.ago ? "" : "Back"} #{name_or_email @user}!"
		else
			@placeholder = "About #{name_or_email @user}"
			unless user_signed_in?
				@new_user = User.new
			end
		end
	end

	def update
		user = User.find params[:id]
		user.update_attributes params[:user]
		user.save!
		render json: user
	end

end