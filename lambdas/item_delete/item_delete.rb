require 'aws-sdk-dynamodb'
require 'json'

def lambda_handler(event:, context:)
  dynamodb_client = Aws::DynamoDB::Client.new

# p event['body']
# resp = dynamodb_client.delete_item({
#   key: {
#     "name" => event['body'], 
#   }, 
#   table_name: "cloud-shopping-list", 
# })

  {
    statusCode: 200,
    body: (event),
  }
  
end

