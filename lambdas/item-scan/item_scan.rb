require 'aws-sdk-dynamodb'

def lambda_handler(event:, context:)
  dynamodb_client = Aws::DynamoDB::Client.new
  table_item = {
    table_name: 'cloud-shopping-list'
}
  result = dynamodb_client.scan(table_item)
  {
    statusCode: 200,
    body: {
      message: result,
    }.to_json
  }
end
