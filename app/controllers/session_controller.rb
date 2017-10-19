get "/sessions/new" do
  erb :'user/login', layout: false
end

post "/sessions" do
  user = User.authenticate(params[:username], params[:password])
  if user
    session[:user_id] = user.id
    redirect :"/home"
  else
    errors = user.errors.full_messages
    puts errors
  end
end
