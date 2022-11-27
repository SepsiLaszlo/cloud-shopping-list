require 'aws-sdk-dynamodb'
require 'json'
def lambda_handler(event:, context:)
  item = event['body-json']['body']
  dynamodb_client = Aws::DynamoDB::Client.new
  table_item = {
    table_name: 'cloud-shopping-list',
    item: item
}
  result = dynamodb_client.put_item(table_item)
  {
    statusCode: 201,
    body: JSON.generate(result)
  }
end
