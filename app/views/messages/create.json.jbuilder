json.id         @message.id
json.user_name  @message.user.name
json.body       @message.body
json.image      @message.image.url
json.date       @message.created_at.strftime("%Y-%m-%d %H:%M:%S")