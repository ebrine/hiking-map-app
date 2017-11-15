class Marker < ActiveRecord::Base
  belongs_to :user
  validates :name, :entry_type, :lat, :lng, presence: true

  def position
    {lat: self.lat, lng: self.lng}
  end
end
