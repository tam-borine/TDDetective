class Grep


  def spec_file_exists?(classname)
    get_project_root_dir
    
  end

  private

  def get_project_root_dir
    File.join(File.dirname(__FILE__), '../spec') #may have to adapt
  end

end
# flagIf:
#
# - grab the name of the class
# - navigate to project root/spec
# - run recursive grep to find file name matching class name
#
#
#
#
# - run recursive grep to find file contents matching class name


#
# user/programs/atom/packages/tddective
#
# user/myproject
#
# user/1/3/4/5/6/7//8/myproject
