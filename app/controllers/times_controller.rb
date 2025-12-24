class TimesController < ApplicationController
	def new
		@time = Time.new
    	session[:current_time] = @time
    	render :json => { start_time: @time }
	end
	def show
		render :json => { start_time: session[:current_time] }
	end
end
