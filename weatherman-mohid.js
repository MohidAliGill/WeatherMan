let commands = process.argv;

if (commands.length<4){
  return;
}
console.log(commands[2]);
console.log(commands[3]);

if (commands[2]==="-e"){
  console.log("task 1");
}
else if (commands[2]==='-a'){
  console.log("task 2");
}
else if (commands[2]==='-c'){
  console.log("task 3");
}
else{
  console.log("Wrong Command input")
}