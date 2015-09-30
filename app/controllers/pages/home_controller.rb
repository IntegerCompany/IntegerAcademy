class Pages::HomeController < ApplicationController
	def index
		@cats = Category.all
		@student = Student.new
		#@student.student_categories = StudentCategory.new
	end

	def create
		render "index"
	end
end
