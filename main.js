#!/usr/bin/env node
let take_user_command=process.argv.slice(2);
let extract_command=take_user_command[0];
let directory_path_user=take_user_command[1];
let path=require('path');
let indent="";
let fs = require('fs');
const types={
    media:['mp4','mp3'],
    archives:['zip','7z','rar','tar','gz','iso','ar'],
    documents:['pdf','docx','doc','xlsx','txt','xls'],
    app:['exe','dmg','pkg','deb']
}
function treeHelper(directory_path_user,indent){
 let isfile=fs.lstatSync(directory_path_user).isFile();
 if(isfile){
    console.log(indent+"├── "+path.basename(directory_path_user));
 }
 else{
    let dirName=path.basename(directory_path_user);
   console.log(indent+"└── "+dirName);
   let read_dir=fs.readdirSync(directory_path_user);
   for(let i=0;i<read_dir.length;i++){
    let child =path.join(directory_path_user,read_dir[i]);
     treeHelper(child,indent+"\t");
   }
 }
}
function treefn(directory_path_user){
    console.log('tree is implemented');
    if(directory_path_user==undefined){
        treeHelper(process.cwd(),"");
        return;
    }
    else{
     if(fs.existsSync(directory_path_user)){
        treeHelper(directory_path_user,indent);
     }
     else{
        console.log('Kindly enter the correct path');
     }
    }
}

function sendFiles(current_path_dir,current_file,category,destination_dir){
    let category_directory_into_new_dir=path.join(destination_dir,category);
    if(fs.existsSync(category_directory_into_new_dir)==false)
    fs.mkdirSync(category_directory_into_new_dir);
    let file_name_extract=path.basename(current_file);
    let same_file_name_path=path.join(category_directory_into_new_dir,file_name_extract);
    fs.copyFileSync(current_file,same_file_name_path);
    
    /*
    //fs.unlinkSync(current_file);
     when you try organize command  without specific path then don't try to uncommit fs.unlinkSync(current_file);
     Might it will destroy your's operating system or corrupt it 
     because it save all the files in the new folder_organized folder,
     So, Please 🙏🙏🙏🙏🙏🙏🙏🙏🙏🙏🙏🙏🙏🙏🙏🙏🙏🙏🙏🙏 don't try without a specified path
      If u try than u are responsible for consequences.
    */
    console.log(`${current_file} is copied into new sub directory ${category_directory_into_new_dir} of new directory ${destination_dir} `);
}

function getCategory(read_current_File){
    let find_file_extension = path.extname(read_current_File);
    find_file_extension=find_file_extension.slice(1);
    for(let type in types){
        let category_TypeArray=types[type];
        for(let i=0;i<category_TypeArray.length;i++){
            if(category_TypeArray[i] == find_file_extension){
                return type;
            }
        }
    }
    return "others";
}

function organizerfn(current_path_user,destination_dir){
   let  read_current_dir=fs.readdirSync(current_path_user);
   console.log(read_current_dir);
   
   let child_current_dir_items;
   for(let i=0;i<read_current_dir.length;i++){
    child_current_dir_items=path.join(current_path_user,`${read_current_dir[i]}`);
    let isFile=fs.lstatSync(child_current_dir_items).isFile();
    if(isFile){
        //find category
        let category =getCategory(read_current_dir[i]);
        console.log(category);
        //copy / paste the current directory files to the new directory 
        sendFiles(current_path_user,child_current_dir_items,category,destination_dir);
    }
   }
}
function organizefn(directory_path_user){
    let new_dest_directory_path
    if(directory_path_user==undefined){
        new_dest_directory_path=process.cwd();
        return;
    }
    else{
        new_dest_directory_path=path.join(directory_path_user,"organized_Files");
     if(fs.existsSync(directory_path_user)){
         if(fs.existsSync(new_dest_directory_path)==false)
         fs.mkdirSync(new_dest_directory_path);
     }
     else{
        console.log('Please Enter correct path');
     }  
    }
   organizerfn(directory_path_user,new_dest_directory_path);
}
function helpfn(){
    console.log(
        `
        ----------------There are mentioned command for user--------------
        1, node main.js help
        2, node main.js -t directorypath (i.e. for tree)
        3, node main.js -o directorypath (i.e. for file organize);
    `)
}

console.log(take_user_command)
switch(extract_command){
    case '-t':
        treefn(directory_path_user);
        break;
        case '-o':
            organizefn(directory_path_user);
            break;
            case 'help':
                helpfn();
                break;
                default:
                    console.log('Please Enter valid command');
                    break;
}
