class UsersController < ApplicationController
	def index
		render :json => { users: resp_body } 
	end
	def create
		@user = User.build(user_params)
		if @user.save
			render :json => @user
			fail
		else
			render :json => @user.errors
		end
	end
	private
		def user_params
			params.expect(user: [:username,  game_times_attributes: [[ :best_time ]]])
		end
		def resp_body
			@reponse = []
			User.includes(:game_times).each do |user|
				@reponse.push({username: user.username, best_time: user.best_time})
			end
			@reponse
		end
end
