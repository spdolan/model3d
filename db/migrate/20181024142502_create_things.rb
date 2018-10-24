class CreateThings < ActiveRecord::Migration[5.2]
  def change
    create_table :things do |t|
      t.string :name
      t.string :thing_url
      t.text :description
      t.string :image_url

      t.timestamps
    end
  end
end
