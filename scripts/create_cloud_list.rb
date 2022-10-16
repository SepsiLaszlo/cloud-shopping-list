require 'aws-sdk'
require 'json'

API_NAME = "cloud-shopping-list-api"
REGION = 'us-east-1'

p 'START'
client = Aws::APIGateway::Client.new(region: REGION)
apis = client.get_rest_apis

apis.items.each do |api|
  client.delete_rest_api(rest_api_id: api.id) if api.name == API_NAME
end

api = client.create_rest_api(
  name: API_NAME,
  description: "Ruby version",
  minimum_compression_size: 123,
  endpoint_configuration: {
    types: ["REGIONAL"],
  })

resources = client.get_resources(rest_api_id: api.id).items

root_id = resources.find { |r| r.path == '/' }.id

item_resource = client.create_resource({
                                         rest_api_id: api.id,
                                         parent_id: root_id,
                                         path_part: "items",
                                       })
# GET ITEMS
item_method = client.put_method(
  rest_api_id: api.id,
  resource_id: item_resource.id,
  http_method: 'GET',
  authorization_type: 'NONE'
)

item_response = client.put_method_response(
  rest_api_id: api.id,
  resource_id: item_resource.id,
  http_method: 'GET',
  status_code: '200',
  response_parameters: {
    'method.response.header.Access-Control-Allow-Headers': true,
    'method.response.header.Access-Control-Allow-Origin': true,
    'method.response.header.Access-Control-Allow-Methods': true
  },
)

item_integration = client.put_integration(
  rest_api_id: api.id,
  resource_id: item_resource.id,
  http_method: 'GET',
  integration_http_method: 'GET',
  type: 'AWS',
  uri: "arn:aws:apigateway:#{REGION}:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:596618193278:function:cloud-shopping-list-GetAllItemFunction-Ny8LJZkBltGO/invocations",
  credentials: 'arn:aws:iam::596618193278:role/ApiGateWayLambdaInvokeRole',
)

item_integration_response = client.put_integration_response(
  rest_api_id: api.id,
  resource_id: item_resource.id,
  http_method: 'GET',
  status_code: '200',
  response_parameters: {
    'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    'method.response.header.Access-Control-Allow-Methods': "'GET'",
    'method.response.header.Access-Control-Allow-Origin': "'*'"
  }
)

# POST ITEMS
item_method = client.put_method(
  rest_api_id: api.id,
  resource_id: item_resource.id,
  http_method: 'POST',
  authorization_type: 'NONE'
)

item_response = client.put_method_response(
  rest_api_id: api.id,
  resource_id: item_resource.id,
  http_method: 'POST',
  status_code: '200',
  response_parameters: {
    'method.response.header.Access-Control-Allow-Headers': true,
    'method.response.header.Access-Control-Allow-Origin': true,
    'method.response.header.Access-Control-Allow-Methods': true
  },
)

item_integration = client.put_integration(
  rest_api_id: api.id,
  resource_id: item_resource.id,
  http_method: 'POST',
  integration_http_method: 'POST',
  type: 'AWS',
  uri: "arn:aws:apigateway:#{REGION}:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:596618193278:function:cloud-shopping-list-PutItemFunction-kbDTHW8odAiY/invocations",
  credentials: 'arn:aws:iam::596618193278:role/ApiGateWayLambdaInvokeRole',
)

item_integration_response = client.put_integration_response(
  rest_api_id: api.id,
  resource_id: item_resource.id,
  http_method: 'POST',
  status_code: '200',
  response_parameters: {
    'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    'method.response.header.Access-Control-Allow-Methods': "'POST'",
    'method.response.header.Access-Control-Allow-Origin': "'*'"
  }
)


p "api #{api.id}"
p 'DONE'