get '/markers' do
  user = User.find(session[:user_id])
  markers = user.markers
  p markers
end
