class CreateDonorView < ActiveRecord::Migration
  def up
    create_view :donor_views, 
      "SELECT 
          a.title||' '||a.first_name||' '||a.last_name as name,
          a.company as company,
          a.organization as organization,
          a.updated_at as updated_at,
          a.id as id
        FROM donors a
      "
  end
  
  def down
    drop_view :donor_views, :if_exists => true
  end
end