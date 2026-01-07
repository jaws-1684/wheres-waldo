class Image < ApplicationRecord
	has_many :positions
	def as_json(options={})
      super({ only: [:id, :name, :waldos, :title] }.merge(options))
    end
end
