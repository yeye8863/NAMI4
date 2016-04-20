class CreateReportView < ActiveRecord::Migration
   def up
    create_view :donor_views, 
      "SELECT * FROM 
      (
        SELECT 
          a.title||' '||a.first_name||' '||a.last_name as name,
          NULL as organization,
          a.decription as description
          a.last_modified_by as last_modified_by
          a.last_modified_at as last_modified_at
        FROM donors a
        UNION
        SELECT 
          b.title||' '||b.first_name||' '||b.last_name as name,
          d.name as organization,
          b.decription as description
          b.last_modified_by as last_modified_by
          b.last_modified_at as last_modified_at
        FROM organizations d JOIN contact_people b ON b.organization_id = d.id) as RESULT
        ORDER BY last_modified_at DESC"
  end
  
  def down
    drop_view :report_views, :if_exists => true
  end
end