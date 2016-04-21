class CreateContactPersonView < ActiveRecord::Migration
  def up
    create_view :contact_person_views, 
      "SELECT 
          a.title||' '||a.first_name||' '||a.last_name as name,
          b.name as organization,
          a.company as company,
          a.updated_at as updated_at,
          a.id as id
        FROM contact_people a, organizations b
        WHERE a.organization_id = b.id
      "
  end
  
  def down
    drop_view :contact_person_views, :if_exists => true
  end
end
