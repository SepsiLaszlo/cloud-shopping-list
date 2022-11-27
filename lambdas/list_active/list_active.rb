require 'aws-sdk-dynamodb'
require 'json'

def lambda_handler(event:, context:)
  id = event['params']['path']['id']

  dynamodb_client = Aws::DynamoDB::Client.new
  table_item = {
    table_name: 'cloud-shopping-list',
    expression_attribute_values: {
    ":user_id" => id, 
    ":active" => true
    }, 
    filter_expression: "user_id = :user_id AND active = :active", 
  }
  result = dynamodb_client.scan(table_item)
  return result['items'].first
end
