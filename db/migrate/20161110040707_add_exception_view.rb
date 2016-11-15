class AddExceptionView < ActiveRecord::Migration
 def up
  create_view :exception_views, 
    "SELECT * FROM 
    (
      SELECT 
        a.first_name,
        a.last_name,
        a.cell_phone,
        a.street_address,
        a.email,
        a.created_at 
      FROM donors a LEFT OUTER JOIN donors b 
      ON a.last_name = b.last_name OR a.cell_phone = b.cell_phone OR a.street_address = b.street_address OR a.email = b.email
     ) as RESULT"
  end
  
  def down
   drop_view :exception_views, :if_exists => true
  end
end
