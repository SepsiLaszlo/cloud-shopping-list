require "./constants.rb"
require 'securerandom'

require 'aws-sdk-dynamodb'
client = Aws::DynamoDB::Client.new
p 'DYNAMODB CREATION - START'

table_names = client.list_tables['table_names']

if table_names.include? 'cloud-shopping-list'


client.delete_table({
  table_name: "cloud-shopping-list", 
})

while client.list_tables['table_names'].include? 'cloud-shopping-list'
 sleep 1
end
 p 'DYNAMODB PREVIOUS DB DELETED'
end

table_creation = client.create_table({
  table_name: "cloud-shopping-list", 
  attribute_definitions: [
    {
      attribute_name: "id", 
      attribute_type: "S", 
    }
    ], 
   
  key_schema: [
    {
      attribute_name: "id", 
      key_type: "HASH", 
    }
  ], 
  provisioned_throughput: {
    read_capacity_units: 1, 
    write_capacity_units: 1, 
  }, 
})

while client.describe_table({table_name: "cloud-shopping-list"})['table']['table_status'] != 'ACTIVE'
 sleep 1
end
p 'DYNAMODB CREATION - DONE'
p 'DYNAMODB SEED - START'

seeds = [
 {
    "id" => SecureRandom.uuid, 
    "name" => "alma", 
    "price" => 250, 
  },
   {
    "id" => SecureRandom.uuid, 
    "name" => "banán", 
    "price" => 350, 
  },
   {
    "id" => SecureRandom.uuid, 
    "name" => "körte", 
    "price" => 250, 
  }
]

seeds.each do |seed|
 client.put_item({
  item: {
    "id" => seed['id'] , 
    "name" => seed['name'], 
    "price" => seed['price'], 
  }, 
  table_name: "cloud-shopping-list", 
})

end

p 'DYNAMODB SEED - DONE'

