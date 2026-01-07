class User < ApplicationRecord
	has_many :game_times, dependent: :destroy
	validates :username, presence: true
	accepts_nested_attributes_for :game_times
end
