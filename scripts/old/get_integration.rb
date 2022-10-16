require 'aws-sdk'
require 'json'
p 'START'
API_NAME = "cloud-shopping-list-api"
REGION = 'us-east-1'
client = Aws::APIGateway::Client.new(region: REGION)
integration = client.get_integration({
  rest_api_id: "bohz5jxlo1", # required
  resource_id: "73ko3l", # required
  http_method: "GET", # required
})
api = client.get_rest_api({
  rest_api_id: "bohz5jxlo1", # required
})
p integration
p api
p 'DONE'