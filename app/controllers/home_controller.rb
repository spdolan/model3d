class HomeController < ApplicationController
  def index
  	@fileName = "name_stamp_v0.jscad"
  end

  def stamp
  	@fileName = "name_stamp_v0.jscad"
  end

  def keychain
  	@fileName = "name_keychain_v0.jscad"
  end

   def magnet
  	@fileName = "name_magnet_v0.jscad"
  end

  def about
  end

  def my_things
  	@my_models = []

	Thing.all.each do |thing|
		if thing.user_id == current_user.id
			@my_models.push(thing)
		end
	end
  end


end
