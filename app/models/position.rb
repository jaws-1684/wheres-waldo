class Position < ApplicationRecord
	def  self.validate_position image_width, image_height, left, top
		#th radius of the box surounding the clicked area
		#35 is the hardcoded px value and can be changed later
		radius_in_percentage = (35 * 100) / image_width

		aproximate_percentge_pos_X = (left * 100) / image_width
    	aproximate_percentge_pos_Y = (top * 100) / image_height

    	boundaries = create_boundaries(aproximate_percentge_pos_X, aproximate_percentge_pos_Y, radius_in_percentage)
    	all.any? { |r| r.inbounds?(boundaries) }
	end
	def self.create_boundaries aproximate_percentge_pos_X, aproximate_percentge_pos_Y, radius_in_percentage
		{
			UPPER_X: aproximate_percentge_pos_X + radius_in_percentage,
	        LOWER_X: aproximate_percentge_pos_X - radius_in_percentage,
	        UPPER_Y: aproximate_percentge_pos_Y + radius_in_percentage,
	        LOWER_Y: aproximate_percentge_pos_Y - radius_in_percentage,
		}
	end

	def inbounds? boundaries
		(self.top.between? boundaries[:LOWER_X], boundaries[:UPPER_X]) && 
		  (self.left.between? boundaries[:LOWER_Y], boundaries[:UPPER_Y])
	end	
end