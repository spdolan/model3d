json.extract! thing, :id, :name, :thing_url, :description, :image_url, :created_at, :updated_at
json.url thing_url(thing, format: :json)
