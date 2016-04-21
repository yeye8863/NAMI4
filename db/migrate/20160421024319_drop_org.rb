class DropOrg < ActiveRecord::Migration
  def change
    drop_table :organizations
    drop_table :contact_people
  end
end
