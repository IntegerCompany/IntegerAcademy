class Pages::HomeController < ApplicationController
	def index
		@cats = Category.all
	end
end
