class Image < ApplicationRecord
	has_many :positions
	def as_json(options={})
      super({ only: [:id, :name, :waldos] }.merge(options))
    end
end
