require 'aws-sdk-dynamodb'
require 'json'

def lambda_handler(event:, context:)
  id = event['params']['path']['id']
  dynamodb_client = Aws::DynamoDB::Client.new

resp = dynamodb_client.delete_item({
  key: {
    "id" => id, 
  }, 
  table_name: "cloud-shopping-list", 
})

  {
    statusCode: 200,
    body: resp,
  }
  
end

