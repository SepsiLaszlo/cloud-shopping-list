require "./constants.rb"
require 'securerandom'


def table_names
 DYNAMODB_CLIENT.list_tables['table_names']
end

def delete_table
 DYNAMODB_CLIENT.delete_table({
  table_name: DYNAMODB_TABLE, 
})
end

def create_table
 DYNAMODB_CLIENT.create_table({
   table_name: DYNAMODB_TABLE, 
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
end

def seed_data
  
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
     "price" => 400, 
   }
 ]
 
 seeds.each do |seed|
  DYNAMODB_CLIENT.put_item({
   item: {
     "id" => seed['id'] , 
     "name" => seed['name'], 
     "price" => seed['price'], 
   }, 
   table_name: DYNAMODB_TABLE, 
 })
 end
end 


def put_table
 p 'DYNAMODB CREATION - START'
 if table_names.include? DYNAMODB_TABLE
   delete_table
  while table_names.include? DYNAMODB_TABLE
   sleep 1
  end
   p 'DYNAMODB PREVIOUS DB DELETED'
 end
 
 create_table
 
 while DYNAMODB_CLIENT.describe_table({table_name: DYNAMODB_TABLE})['table']['table_status'] != 'ACTIVE'
  sleep 1
 end
 p 'DYNAMODB CREATION - DONE'
 p 'DYNAMODB SEED - START'
 seed_data
 p 'DYNAMODB SEED - DONE'
end