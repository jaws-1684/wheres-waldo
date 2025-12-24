class AddWaldosNumberToImages < ActiveRecord::Migration[8.1]
  def change
    add_column :images, :waldos, :integer
  end
end
