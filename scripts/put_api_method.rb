def put_api_method(http_method: 'GET',api:, resource:, function_arn:)
  method = API_CLIENT.put_method(
  rest_api_id: api.id,
  resource_id: resource.id,
  http_method: http_method,
  authorization_type: 'NONE'
)

  response = API_CLIENT.put_method_response(
  rest_api_id: api.id,
  resource_id: resource.id,
  http_method: http_method,
  status_code: '200',
  response_parameters: {
    'method.response.header.Access-Control-Allow-Headers': true,
    'method.response.header.Access-Control-Allow-Origin': true,
    'method.response.header.Access-Control-Allow-Methods': true
  },
)
integration = API_CLIENT.put_integration(
  rest_api_id: api.id,
  resource_id: resource.id,
  http_method: http_method,
  integration_http_method: "POST",
  type: 'AWS',
  uri: "arn:aws:apigateway:#{REGION}:lambda:path/2015-03-31/functions/#{function_arn}/invocations",
  credentials: 'arn:aws:iam::596618193278:role/ApiGateWayLambdaInvokeRole',
)
integration_response = API_CLIENT.put_integration_response(
  rest_api_id: api.id,
  resource_id: resource.id,
  http_method: http_method,
  status_code: '200',
  response_parameters: {
    'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    'method.response.header.Access-Control-Allow-Methods': "'GET, POST, DELETE'",
    'method.response.header.Access-Control-Allow-Origin': "'*'"
  }
)
end