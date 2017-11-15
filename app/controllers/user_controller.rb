get "/users/new" do
  erb :"/user/registration", layout: false
end

post '/users' do
  new_user = User.new(params[:user])
  puts new_user
  if params[:user][:password].length < 8 || params[:user][:password].length > 72
    if new_user.valid?
      content_type :'application/json'
      ["Password must be between 8 and 72 characters"].to_json
    else
      content_type :'application/json'
      messages = new_user.errors.full_messages
      messages << "Password must be between 8 and 72 characters"
      messages.to_json
    end
  else
      if new_user.valid?
        new_user.save
        session[:user_id] = new_user.id
        'redirect'
      else
        content_type :'application/json'
        new_user.errors.full_messages.to_json
      end
  end
end
