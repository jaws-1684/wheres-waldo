class ImagesController < ApplicationController
	before_action :set_image
	def show
		render :json => resp_body
	end
	private
		def set_image
			@image = Image.find(params[:id])
		end
		def resp_body
	    	{ image_large: image_url(@image.name) }
	  	end
end
