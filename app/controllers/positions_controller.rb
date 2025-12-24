class PositionsController < ApplicationController
	before_action :validate_params
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
	  			instance_variable_set("@#{arg}", params[arg].to_i)
	  		end
	  	end
	  	def validate_params
	  		begin
	  			[:width, :height, :top, :left].each do |arg|
	  				unless params[arg] || params[arg].to_i
	  					raise ArgumentError
	  				end
	  			end
			rescue ArgumentError
				render :json => { ok: false, target: "not found"}
			end
	  	end
end
