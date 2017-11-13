get "/users/new" do
  erb :"/user/registration", layout: false
end

post '/users' do
  p params[:user]
  new_user = User.new(params[:user])
  if request.xhr?
    puts new_user
    if new_user.save
      'redirect'
    else
      content_type :'application/json'
      p new_user.errors.full_messages
      new_user.errors.full_messages.to_json
    end
  else
    if new_user.save
      redirect :'/home'
    else
      errors = new_user.errors.full_messages
    end
  end
end
