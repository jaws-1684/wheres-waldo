class User < ApplicationRecord
	has_many :game_times, dependent: :destroy
	validates :username, presence: true, uniqueness: true
	accepts_nested_attributes_for :game_times

   def best_time
   	self.game_times.sort.first
   end
   def self.users_with_best_time
   		@reponse = []
		User.includes(:game_times).each do |user|
			@reponse.push({username: user.username, best_time: user.best_time})
		end
		@reponse.sort_by { |user| user[:best_time] }
   end
end
