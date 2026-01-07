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
USERS = [
  { username: "cosmic_wanderer", time: "17:42" },
  { username: "shadow_whisper", time: "03:15" },
  { username: "neon_pulse", time: "22:08" },
  { username: "velvet_storm", time: "14:33" },
  { username: "cipher_dream", time: "19:27" },
  { username: "lunar_echo", time: "08:51" },
  { username: "pixel_phantom", time: "11:04" },
  { username: "azure_drift", time: "23:19" },
  { username: "chrome_sage", time: "06:45" },
  { username: "ember_flux", time: "20:12" }
]
USERS.each do |u|
    user = User.build(username: u[:username])
    user.game_times.build(best_time: u[:time])
    user.save!
end
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
