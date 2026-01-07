class AddTitleFieldToImages < ActiveRecord::Migration[8.1]
  def change
     add_column :images, :title, :string
  end
end
