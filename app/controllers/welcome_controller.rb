class WelcomeController < ApplicationController
	def index
		if user_signed_in?
			@placeholder = "Welcome #{current_user.created_at > 12.hours.ago ? "" : "Back"} #{current_user.name || current_user.email}!"
			@move_my_post = MoveMyPost.new
		else
			@user = User.new
			# @placeholder = "Enter Some Text!"
		end
	end
end