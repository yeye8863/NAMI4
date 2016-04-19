module ApplicationHelper
  def sortable_ind(column, title = nil)
    title ||= column.titleize
      css_class = column == sort_column_ind ? "current #{sort_direction_ind}" : nil
      direction = column == sort_column_ind && sort_direction_ind == "asc" ? "desc" : "asc"
    link_to title, params.merge(:sort_ind => column, :direction_ind => direction, :page => nil), {:class => css_class, :remote => true}
  end
  def sortable_org(column, title = nil)
    title ||= column.titleize
      css_class = column == sort_column_org ? "current #{sort_direction_org}" : nil
      direction = column == sort_column_org && sort_direction_org == "asc" ? "desc" : "asc"
    link_to title, params.merge(:sort_org => column, :direction_org => direction, :page => nil), {:class => css_class, :remote => true}
  end 
end
