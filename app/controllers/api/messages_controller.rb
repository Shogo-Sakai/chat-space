class Api::MessagesController < ApplicationController
  def index

    # @messages = Message.where('id > ?', params[:id])
    respond_to do |format|
      format.html
      format.json{@messages = Message.where('id > ?', params[:id])}
    end
  end
end