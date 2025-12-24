class PositionsController < ApplicationController
	before_action :set_arguments
	def validate
		render :json => resp_body
	end
	private
		def resp_body
	    	{ target_valid: Position.validate_position(width: @width, height: @height, left: @left, top: @top) }
	  	end
	  	def set_arguments
	  		[:width, :height, :top, :left].each do |arg|
	  			instance_variable_set("@#{arg}", params[arg].to_i ||= 0)
	  		end
	  	end
end
