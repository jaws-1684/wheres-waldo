IMAGES = [ { 
	image_id: 2,	
	positions: [
    {
        "top" => 29.964252767527675,
        "left" => 58.88566110108303
    },
    {
        "top" => 24.55219864698647,
        "left" => 85.51020983754513
    },
    {
        "top" => 45.95441266912669,
        "left" => 26.665444494584836
    }
]
  }
]

IMAGES.each do |i|
	i[:positions].each {|p| Position.find_or_create_by!(top: p["top"].to_i, left: p["left"].to_i, image_id: i[:image_id]) }
end


# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
