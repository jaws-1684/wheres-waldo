class AddFieldsToImage < ActiveRecord::Migration[8.1]
  def change
    add_column :images, :name, :string
  end
end
