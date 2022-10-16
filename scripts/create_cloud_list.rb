require "./constants.rb"
require "./put_lambda.rb"
require "./put_api_method.rb"

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


 items_scan_lambda =  put_lambda(name:'item_scan')
 put_api_method(http_method:'GET',
 api: api, resource: item_resource,
 function_arn: items_scan_lambda.function_arn)
 items_put_lambda =  put_lambda(name:'item_put')
 put_api_method(http_method:'POST',
 api: api, resource: item_resource,
 function_arn: items_scan_lambda.function_arn)
p "api #{api.id}"
# p items_scan_lambda
p 'API CREATION - DONE'