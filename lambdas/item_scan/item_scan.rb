require 'aws-sdk-dynamodb'
require 'json'

def lambda_handler(event:, context:)
  dynamodb_client = Aws::DynamoDB::Client.new
  table_item = {
    table_name: 'cloud-shopping-list'
  }
  result = dynamodb_client.scan(table_item)
  return result['items']
  
  # return [
  #   {
  #     id:'aaa',
  #     name: 'teszt 1',
  #     price: 1234
  #   },
  #   {
  #     id:'bbb',
  #     name: 'teszt 2',
  #     price: 4321
  #   },
  #   ]
end
