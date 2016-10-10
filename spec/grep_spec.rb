require 'grep'

describe Grep do
  
  it "searches filenames and matches the class name param" do
    class_name = "Animal"
    expect(subject.spec_file_exists?(class_name)).to eq false
  end
end
