class TimesController < ApplicationController
	def new
		@time = Time.now
		session[:current_time] = @time
		render :json => { time: true }
	end
	def show
		render :json => { start_time: session[:current_time] }
	end
	def destroy
		session[:current_time] = nil
	end
end
