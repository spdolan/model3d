class JscadController < ApplicationController

	def display
	  file_name = params[:id]

	  send_file(
	    "#{Rails.root}/app/assets/jscad_examples/#{file_name}.jscad",
	    filename: "#{file_name}.jscad",
	    #type: "application/pdf"
	  )
	end

	def image
	file_name = params[:id]

	  send_file(
	    "#{Rails.root}/app/assets/images/#{file_name}.gif",
	    filename: "#{file_name}.gif",
	    #type: "application/pdf"
	  )
	end
end