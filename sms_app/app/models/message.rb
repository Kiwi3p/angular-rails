class Message
  include Mongoid::Document
  include Mongoid::Timestamps
  field :sender_id, type: Integer
  field :recipient_phone, type: String
  field :message_body, type: String
  field :sent_at, type: Time
end
