class Student < ActiveRecord::Base
	has_many :sub_categories, through: :student_categories
end
