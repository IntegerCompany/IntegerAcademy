class Student < ActiveRecord::Base
	has_many :sub_categories, through: :student_categories
	has_many :student_categories
end
