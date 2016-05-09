# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require 'rubygems'
require 'cucumber/rake/task'
require 'rspec/core/rake_task'
require File.expand_path('../config/application', __FILE__)

Rails.application.load_tasks

# ==============================================
# Rspec
# ==============================================

desc 'Run all RSpec tests'
RSpec::Core::RakeTask.new(:spec) do |task|
  task.rspec_opts = '--format progress'
end


# ==============================================
# Cucumber
# ==============================================

desc 'Run all Cucumber tests'
Cucumber::Rake::Task.new(:cucumber) do |task|
  task.cucumber_opts = ['--format=progress', 'tests', '--require tests/features']
end


# ==============================================

task :default => [:cucumber]