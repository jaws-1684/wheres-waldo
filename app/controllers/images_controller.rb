class ImagesController < ApplicationController
	before_action :set_images
	def index
		render :json => resp_body
	end
	private
		def resp_body
			@result = {images: []}
			@images.each do |i| 
				@result[:images].push(
					{
						id: i.id,
						url: image_url(i.name),
						waldos: i.waldos
					})  
			end
			@result
		end
		def set_images
			@images = Image.all
		end
end
