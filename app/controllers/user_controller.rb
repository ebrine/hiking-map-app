get "/users/new" do
  erb :"/user/registration", layout: false
end

post '/users' do
  new_user = User.new(params[:user])
  if request.xhr?
    if new_user.save
      session[user_id] = new_user.id
      'redirect'
    else
      content_type :'application/json'
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
