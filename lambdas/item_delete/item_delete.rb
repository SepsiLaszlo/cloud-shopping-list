require 'aws-sdk-dynamodb'
require 'json'

def lambda_handler(event:, context:)
  name = event['params']['path'][':name']
  dynamodb_client = Aws::DynamoDB::Client.new

resp = dynamodb_client.delete_item({
  key: {
    "name" => name, 
  }, 
  table_name: "cloud-shopping-list", 
})

  {
    statusCode: 200,
    body: resp,
  }
  
end

