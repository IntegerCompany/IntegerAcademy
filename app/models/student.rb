class Student < ActiveRecord::Base
	has_many :sub_categories, through: :student_categories
	has_many :student_categories
	accepts_nested_attributes_for :student_categories, :allow_destroy => :false

	def save_photo(file)
		name = file.original_filename
		directory = "students/student_#{self.id}"
		Dir.mkdir("public/" + directory) unless File.exists?("public/" + directory)
		# create the file path
		path = File.join(directory, name)
		# write the file
		File.open("public/" + path, "wb") { |f| f.write(file.read) }

		if File.file?("public/" + path)
			self.photo = path
			self.save
		end
	end

	def save_portfolio(file)

		name = file.original_filename
		directory = "students/student_#{self.id}"
		Dir.mkdir("public/" + directory) unless File.exists?("public/" + directory)

		path = File.join(directory, name)
		# write the file
		File.open("public/" + path, "wb") { |f| f.write(file.read) }

		if File.file?("public/" + path)
			self.portfolio = path
			self.save
		end

	end
end
