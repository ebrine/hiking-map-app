get "/" do
  erb :"/landing", layout: false
end

get "/home" do
  erb :"/index"
end
