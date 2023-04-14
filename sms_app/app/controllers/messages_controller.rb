class MessagesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]
  
    def index
      messages = Message.all
      render json: messages
    end
  
    def create
      @message = Message.new(message_params)
  
      if @message.save
        send_sms(@message.recipient_phone, @message.message_body)
        render json: @message, status: :created
      else
        render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    private
    def message_params
      params.require(:message).permit(:recipient_phone, :message_body)
    end
  
    def send_sms(to, body)
      client = Twilio::REST::Client.new
      from = "+18555441941" # Set this to your Twilio phone number
      message = client.messages.create(
        to: to,
        from: from, # Add the from phone number here
        body: body
      )
    end
  end
  