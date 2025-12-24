class AddImageFieldToPosition < ActiveRecord::Migration[8.1]
  def change
    add_reference :positions, :image, null: false, foreign_key: true
  end
end
