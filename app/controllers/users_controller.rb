
class UsersController < ApplicationController
	def index
		@users = User.all 
	end

	def show
		@move_my_post = MoveMyPost.new
		@user = User.find params[:id]
		if @user == current_user
			@placeholder = "Welcome #{@user.created_at > 12.hours.ago ? "" : "Back"} #{@user.name || @user.email}!"
		else
			@placeholder = "About #{@user.name || @user.email}"
			unless user_signed_in?
				@new_user = User.new
			end
		end
	end
end