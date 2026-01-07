class User < ApplicationRecord
	has_many :game_times, dependent: :destroy
	validates :username, presence: true, uniqueness: true
	accepts_nested_attributes_for :game_times

   def best_time
   	self.game_times.sort.first
   end
end
