require './service.rb'

class ApiMethod < Service
    attr_reader :http_method, :api, :resource, :authorizer_id
    
    def initialize(http_method:,api:, resource:,  authorizer_id: nil)
        @http_method = http_method
        @api = api
        @resource = resource
        @authorizer_id = authorizer_id
    end
    
    def call
        put_method
        put_method_response
        put_integration
        put_integration_response
    end
    
    private
    
    def put_method
        params = {}
        if authorizer_id
          params =  {
            rest_api_id: api.id,
            resource_id: resource.id,
            http_method: http_method,
            authorization_type: 'COGNITO_USER_POOLS',
            authorizer_id: authorizer_id
           } 
            
        else
          params =  {
            rest_api_id: api.id,
            resource_id: resource.id,
            http_method: http_method,
            authorization_type: 'NONE'
           } 
        end
            
        
        API_CLIENT.put_method(params)
    end

    def put_method_response
      API_CLIENT.put_method_response(
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
    end

    def put_integration
        raise 'Not implemented'
    end
    
    def put_integration_response
        API_CLIENT.put_integration_response(
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
end

class LambdaApiMethod < ApiMethod
    attr_reader :function_arn
    def initialize(**args)
        @function_arn = args.delete(:function_arn)
        super(args)
    end
    
    private
    
    def put_integration
        API_CLIENT.put_integration(
              rest_api_id: api.id,
              resource_id: resource.id,
              http_method: http_method,
              integration_http_method: "POST",
              type: 'AWS',
              uri: "arn:aws:apigateway:#{REGION}:lambda:path/2015-03-31/functions/#{function_arn}/invocations",
              credentials: 'arn:aws:iam::596618193278:role/ApiGateWayLambdaInvokeRole',
              request_templates: {
                'application/json': File.read('/home/ec2-user/environment/cloud-shopping-list/scripts/method_request_passtrought.txt')
              }
            )
    end
end

class MockApiMethod < ApiMethod
    def put_integration
        API_CLIENT.put_integration(
          rest_api_id: api.id,
          resource_id: resource.id,
          http_method: http_method,
          integration_http_method: http_method,
          type: 'MOCK',
          request_templates: {
                'application/json': '{"statusCode": 200}'
              }
        )
    end
end