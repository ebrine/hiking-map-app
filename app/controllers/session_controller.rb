get "/sessions/new" do
  erb :'user/login', layout: false
end

post "/sessions" do
  user = User.authenticate(params[:username], params[:password])
  if request.xhr?
    if user
      session[:user_id] = user.id
      'redirect'
    else
      "That username or password is incorrect"
    end
  else
    if user
      session[:user_id] = user.id
      redirect :"/home"
    else
      "That username or password is incorrect"
    end
  end
end
