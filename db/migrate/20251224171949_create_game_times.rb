class CreateGameTimes < ActiveRecord::Migration[8.1]
  def change
    create_table :game_times do |t|
      t.references :user, null: false, foreign_key: true
      t.string :best_time

      t.timestamps
    end
  end
end
