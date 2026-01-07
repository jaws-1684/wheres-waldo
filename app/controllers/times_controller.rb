class TimesController < ApplicationController
	def new
		@time = Time.new
    	session[:start_time] = @time
    	render :json => { start_time: @time }
	end
	def show
		render :json => { time: format_time(session[:start_time], Time.now) }
	end
	private 
		def format_time time1, time2
			time_parsed = Time.parse(time1)
			total_seconds = time2 - time_parsed
			minutes = (total_seconds / 60).floor # => 30
			seconds = total_seconds.to_i % 60 # => 0
			{minutes: minutes, seconds: seconds}
		end
end
