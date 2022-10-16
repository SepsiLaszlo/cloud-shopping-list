require 'aws-sdk-dynamodb'
require 'json'
def lambda_handler(event:, context:)
 
  data = event["body"]
  dynamodb_client = Aws::DynamoDB::Client.new
  table_item = {
    table_name: 'cloud-shopping-list',
    item: data
}
  result = dynamodb_client.put_item(table_item)
  {
    statusCode: 201,
    body: {
      message: result,
      headers: {
        "Access-Control-Allow-Headers" => "*",
        "Access-Control-Allow-Origin"=> "*",
        "Access-Control-Allow-Methods"=> "OPTIONS,POST,GET,PUT,PATCH"
    },
    }.to_json
  }
end
