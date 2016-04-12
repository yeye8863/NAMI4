class CreateAgendaView < ActiveRecord::Migration
  def up
    create_view :agenda_views, 
      "SELECT * FROM 
      (
        SELECT 
          a.title||' '||a.first_name||' '||a.last_name as name,
          NULL as organization,
          c.contact_date as contact_date,
          c.followup_date as followup_date,
          c.id as contact_id
        FROM donors a JOIN contacts c ON a.id = c.donor_id
        WHERE c.followup_date >= date('now')
        UNION
        SELECT 
          b.title||' '||b.first_name||' '||b.last_name as name,
          d.name as organization,
          c.contact_date as contact_date,
          c.followup_date as followup_date,
          c.id as contact_id
        FROM contacts c JOIN contact_people b ON c.contact_person_id = b.id
        JOIN organizations d ON b.organization_id = d.id
        WHERE c.followup_date >= date('now')) as RESULT
        ORDER BY followup_date ASC"
  end
  
  def down
    drop_view :agenda_views, :if_exists => true
  end
end
