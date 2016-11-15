class AddSecondaryInfoDonors < ActiveRecord::Migration
  def change
    add_column :donors, :secondary_email, :string
    add_column :donors, :secondary_street_address, :string
    add_column :donors, :secondary_street_address_2, :string
    add_column :donors, :secondary_city, :string
    add_column :donors, :secondary_state, :string
    add_column :donors, :secondary_country, :string
    add_column :donors, :secondary_zipcode, :string
    add_column :donors, :secondary_home_phone, :string
    add_column :donors, :secondary_business_phone, :string
    add_column :donors, :secondary_cell_phone, :string
  end
end
