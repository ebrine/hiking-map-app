class Marker < ActiveRecord::Base
  belongs_to :user
  validates :name, :entry_type, :lat, :long, presence: true

  def position
    {lat: self.lat, long: self.long}
  end
end
