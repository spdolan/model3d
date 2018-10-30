class Thing < ApplicationRecord

	mount_uploader :image_url, ImageUploader
	
	mount_uploader :thing_url, ThingUploader
end
