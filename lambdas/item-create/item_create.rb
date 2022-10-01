require 'aws-sdk-dynamodb'
require 'json'
def lambda_handler(event:, context:)
  data = JSON.parse(event["body"])
  dynamodb_client = Aws::DynamoDB::Client.new
  table_item = {
    table_name: 'cloud-shopping-list',
    item: data
}
  result = dynamodb_client.put_item(table_item)
  {
    statusCode: 201,
    body: {
      message: result
    }.to_json
  }
end
