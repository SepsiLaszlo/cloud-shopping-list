require 'aws-sdk-dynamodb'
require 'json'

def lambda_handler(event:, context:)
  dynamodb_client = Aws::DynamoDB::Client.new


resp = dynamodb_client.delete_item({
  key: {
    "name" => "ddd", 
  }, 
  table_name: "cloud-shopping-list", 
})

  {
    statusCode: 200,
    body: "deleted",
  }
  
end

