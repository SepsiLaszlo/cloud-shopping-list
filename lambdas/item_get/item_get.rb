require 'aws-sdk-dynamodb'
require 'json'

def lambda_handler(event:, context:)
  params = event['pathParameters']
  dynamodb_client = Aws::DynamoDB::Client.new
  table_item = {
    table_name: 'cloud-shopping-list',
    key: {
    "name" => params["name"],
   
  }
}
  result = dynamodb_client.get_item(table_item)
  {
    statusCode: 200,
    body: JSON.generate(result)
  }
end
