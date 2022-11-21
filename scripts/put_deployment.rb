require './constants.rb'

def put_deployment(api_id: )
    p 'PUT DEPLOYMENT - START'
    API_CLIENT.create_deployment({
      rest_api_id: api_id,
      stage_name: "prod",
    })
     p 'PUT DEPLOYMENT - DONE'
     
end

