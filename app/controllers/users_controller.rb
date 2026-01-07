class UsersController < ApplicationController
	def index
		render :json => { users: User.users_with_best_time } 
	end
	def create
		@user = User.build(user_params)
		if @user.save
			render :json => @user
		else
			render :json => @user.errors
		end
	end
	private
		def user_params
			params.expect(user: [:username,  game_times_attributes: [[ :best_time ]]])
		end
end
