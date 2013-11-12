
class UsersController < ApplicationController
	def index
		
	end

	def show
		@move_my_post = MoveMyPost.new
		@user = User.find params[:id]
	end
end