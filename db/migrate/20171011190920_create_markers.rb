class CreateMarkers < ActiveRecord::Migration
  def change
    create_table :markers do |t|
      t.string :name, null: false
      t.string :entry_type, null: false
      t.string :details
      t.string :image
      t.integer :lat, null: false
      t.integer :lng, null: false
      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
