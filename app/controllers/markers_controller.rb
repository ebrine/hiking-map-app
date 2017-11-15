get '/markers' do
  user = User.find(session[:user_id])
  markers = user.markers
  p markers
  if request.xhr?
    content_type :'application/json'
    markers.to_json
  end
end
