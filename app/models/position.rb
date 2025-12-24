class Position < ApplicationRecord
	belongs_to :image
	def  self.get_position width: 0, height: 0, left: 0, top: 0, iid: 2
		#th radius of the box surounding the clicked area
		#35 is the hardcoded px value and can be changed later
		radius_in_percentage = (35 * 100) / width

		aproximate_percentge_pos_X = (left * 100) / width
    	aproximate_percentge_pos_Y = (top * 100) / height
    	boundaries = create_boundaries(aproximate_percentge_pos_X, aproximate_percentge_pos_Y, radius_in_percentage)
    	result = where(image_id: iid).select  { |r| r.inbounds?(boundaries) }
    	result ? result.first : nil
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
		(self.top.between? boundaries[:LOWER_Y], boundaries[:UPPER_Y]) && 
		  (self.left.between? boundaries[:LOWER_X], boundaries[:UPPER_X])
	end	
end