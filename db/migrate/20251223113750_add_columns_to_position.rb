class AddColumnsToPosition < ActiveRecord::Migration[8.1]
  def change
    add_column :positions, :top, :integer
    add_column :positions, :left, :integer
  end
end
