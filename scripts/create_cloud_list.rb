require "./constants.rb"
require "./put_lambda.rb"
require './create_dynamodb.rb'
require './api_method.rb'
require './put_deployment.rb'
require './create_authorizer.rb'

put_table
p 'API CREATION START'
apis = API_CLIENT.get_rest_apis

apis.items.find do |api|
  API_CLIENT.delete_rest_api(rest_api_id: api.id) if api.name == API_NAME
end

api = API_CLIENT.create_rest_api(
  name: API_NAME,
  description: "Ruby version",
  minimum_compression_size: 123,
  endpoint_configuration: {
    types: ["REGIONAL"],
  })

resources = API_CLIENT.get_resources(rest_api_id: api.id).items

root_id = resources.find { |r| r.path == '/' }.id

item_resource = API_CLIENT.create_resource({
                                         rest_api_id: api.id,
                                         parent_id: root_id,
                                         path_part: "items",
                                       })
item_id_resource = API_CLIENT.create_resource({
                                        rest_api_id: api.id,
                                         parent_id: item_resource.id,
                                         path_part: "{id}",
                                       })                                       


MockApiMethod.call(http_method:'OPTIONS',
 api: api, resource: item_resource)
MockApiMethod.call(http_method:'OPTIONS',
 api: api, resource: item_id_resource)

 items_scan_lambda =  put_lambda(name:'item_scan')
 LambdaApiMethod.call(http_method:'GET',
 api: api, resource: item_resource,
 function_arn: items_scan_lambda.function_arn)
 
 items_put_lambda =  put_lambda(name:'item_put')
 LambdaApiMethod.call(http_method:'POST',
 api: api, resource: item_resource,
 function_arn: items_put_lambda.function_arn)
 
 items_delete_lambda =  put_lambda(name:'item_delete')
 LambdaApiMethod.call(http_method:'DELETE',
 api: api, resource: item_id_resource,
 function_arn: items_delete_lambda.function_arn)
 
 # List endpoints
 
 list_resource = API_CLIENT.create_resource({
                                         rest_api_id: api.id,
                                         parent_id: root_id,
                                         path_part: "lists",
                                       })

list_id_resource = API_CLIENT.create_resource({
                                        rest_api_id: api.id,
                                         parent_id: list_resource.id,
                                         path_part: "{id}",
                                       })                
 
 list_active_resource = API_CLIENT.create_resource({
                                         rest_api_id: api.id,
                                         parent_id: list_id_resource.id,
                                         path_part: "active",
                                       })

authorizer = create_authorizer(rest_api_id: api.id)
 MockApiMethod.call(http_method:'OPTIONS',
 api: api, resource: list_resource)
MockApiMethod.call(http_method:'OPTIONS',
 api: api, resource: list_id_resource)
 MockApiMethod.call(http_method:'OPTIONS',
 api: api, resource: list_active_resource)
 
 list_all_lambda =  put_lambda(name:'list_all')
 LambdaApiMethod.call(http_method:'GET',
 api: api, resource: list_id_resource,
 function_arn: list_all_lambda.function_arn,
 authorizer_id: authorizer.id)
 
 list_active_lambda =  put_lambda(name:'list_active')
 LambdaApiMethod.call(http_method:'GET',
 api: api, resource: list_active_resource,
 function_arn: list_active_lambda.function_arn,
 authorizer_id: authorizer.id)
 
 list_put_lambda =  put_lambda(name:'list_put')
 LambdaApiMethod.call(http_method:'POST',
 api: api, resource: list_resource,
 function_arn: list_put_lambda.function_arn,
 authorizer_id: authorizer.id)
 
 put_deployment(api_id: api.id)
 
 # p items_scan_lambda
p 'API CREATION - DONE'
p "INVOKE URL:  https://#{api.id}.execute-api.us-east-1.amazonaws.com/prod"