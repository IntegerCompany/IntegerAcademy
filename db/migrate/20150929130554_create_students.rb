class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.string :first_name
      t.string :last_name
      t.date :birth_day
      t.string :email
      t.integer :phone_number
      t.string :english_level
      t.string :university
      t.string :faculty
      t.integer :course
      t.string :field_of_study
      t.text :about_me

      t.timestamps null: false
    end
  end
end
