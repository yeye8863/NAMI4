class CreateDonorView < ActiveRecord::Migration
  def up
    create_view :donor_views, 
      "SELECT * FROM 
      (
        SELECT 
          a.title||' '||a.first_name||' '||a.last_name as name,
          NULL as organization,
          a.updated_at as updated_at
        FROM donors a
        UNION
        SELECT 
          b.title||' '||b.first_name||' '||b.last_name as name,
          d.name as organization,
          b.updated_at as updated_at
        FROM organizations d JOIN contact_people b ON b.organization_id = d.id) as RESULT
        ORDER BY updated_at DESC"
  end
  
  def down
    drop_view :donor_views, :if_exists => true
  end
end