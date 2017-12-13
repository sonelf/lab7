// See the following on using objects as key/value dictionaries
// https://stackoverflow.com/questions/1208222/how-to-do-associative-array-hashing-in-javascript

//Question 4 stuff
var builtInWords = {};

builtInWords[".s"]=function(terminal, stack){
    print(terminal, " <" + stack.length + "> " + stack.slice().join(" "));
}
builtInWords["+"]=function(terminal, stack){
    var first = stack.pop();
    var second = stack.pop();
    stack.push(first+second);
}
builtInWords["-"]=function(terminal, stack){
    var first = stack.pop();
    var second = stack.pop();
    stack.push(second-first);
}

builtInWords["*"]=function(terminal, stack){
    var first = stack.pop();
    var second = stack.pop();
    stack.push(first*second);
}
builtInWords["/"]=function(terminal, stack){
    var first = stack.pop();
    var second = stack.pop();
    if(first!=0){
        stack.push(first/second);
    }else{
        print(terminal,"cannot divide by zero")
        stack.push(second);
        stack.push(first);
    }
}
builtInWords["<"]=function(terminal, stack){
    var first = stack.pop();
    var second = stack.pop();
    if(second<first){
        stack.push(-1);
    }else{
        stack.push(0);
    }
}
builtInWords[">"]=function(terminal, stack){
    var first = stack.pop();
    var second = stack.pop();
    if(second>first){
        stack.push(-1);
    }else{
        stack.push(0);
    }
}

builtInWords["="]=function(terminal, stack){
    var first = stack.pop();
    var second = stack.pop();
    if(second==first){
        stack.push(-1);
    }else{
        stack.push(0);
    }
}
builtInWords["swap"]=function(terminal, stack){
    var first = stack.pop();
    var second = stack.pop();
    stack.push(first);
    stack.push(second);
}
builtInWords["nip"]=function(terminal, stack){
    var first = stack.pop();
    var second = stack.pop();
    stack.push(first);
}
builtInWords["over"]=function(terminal, stack){
    var first = stack.pop();
    var second = stack.pop();
    stack.push(first);
    stack.push(second);
    stack.push(first);
}
var userDefinedWords = {};


function emptyStack(stack) {
    return [];
}

/**
 * Print a string out to the terminal, and update its scroll to the
 * bottom of the screen. You should call this so the screen is
 * properly scrolled.
 * @param {Terminal} terminal - The `terminal` object to write to
 * @param {string}   msg      - The message to print to the terminal
 */
function print(terminal, msg) {
    terminal.print(msg);
    $("#terminal").scrollTop($('#terminal')[0].scrollHeight + 40);
}

/** 
 * Sync up the HTML with the stack in memory
 * @param {Array[Number]} The stack to render
 */
function renderStack(stack) {
    $("#thestack").empty();
    stack.slice().reverse().forEach(function(element) {
        $("#thestack").append("<tr><td>" + element + "</td></tr>");
    });
};

/** 
 * Process a user input, update the stack accordingly, write a
 * response out to some terminal.
 * @param {Array[Number]} stack - The stack to work on
 * @param {string} input - The string the user typed
 * @param {Terminal} terminal - The terminal object
 */

 defining=false;
 hasName=false;
 nameKey="";
 functionsArr=[];
function process(stack, input, terminal) {
    // The user typed a number
    if (!(isNaN(Number(input)))&&!defining) {
        print(terminal,"pushing " + Number(input));
        stack.push(Number(input));
    }else if(defining&&hasName==false){
        nameKey=input;
        hasName=true;
    }
    else if(input==":"){
        defining=true;
    }
    else if(input==";"){
        userDefinedWords[nameKey]=functionsArr;

        functionsArr=[];
        hasName=false;
        defining=false;
    }
    else if(defining&&hasName){
        hasdone=false;
        for(key in builtInWords){
            if(input==key){
                functionsArr.push(builtInWords[key]);
                hasdone=true;
            }
        }
        for(key in userDefinedWords){
            if(input==key){
                //functionsArr.push(userDefinedWords[key]);
                functionsArr.push(key);
                hasdone=true;
            }
        }
        if(!hasdone){
            functionsArr.push(input);
        }
    }
    else{
            defined= false;
            for(key in builtInWords){
                //console.log(key +builtInWords[key]);
                if(input==key){
                    builtInWords[key](terminal,stack);
                    defined =true;  
                }
            }
            for(key in userDefinedWords){
                if(input==key){
                    for(var i=0;i<userDefinedWords[key].length;i++){
                        console.log("abt to print:"+ input);
                        console.log(userDefinedWords[key]);
                        if(isNaN(userDefinedWords[key][i])){
                            if(typeof userDefinedWords[key][i]==="function"){
                                console.log("abt to print: userDefinedWords[key][i]");
                                console.log(userDefinedWords[key][i]);
                                userDefinedWords[key][i](terminal,stack);
                            }
                            else{
                                //process(stack,key,terminal);
                                process(stack,userDefinedWords[key][i], terminal);
                                    
                            }
                            
                        }else{
                            stack.push(Number(userDefinedWords[key][i]));
                        }
                    defined =true;
                }
            }
        } 
      if(!defined){
                print(terminal, ":-( Unrecognized input of "+input);
            }
    }
    if(stack.length!=0){
        renderStack(stack);
    }
}

function runRepl(terminal, stack) {
    terminal.input("Type a forth command:", function(line) {
        print(terminal, "User typed in: " + line);
        lineArr=line.trim().split(/ +/);
        console.log(lineArr);
        for(var j=0;j<lineArr.length;j++){
            console.log("processing "+ lineArr[j]);
            process(stack, lineArr[j], terminal);
            //console.log(stack);
        }
        runRepl(terminal, stack);
    });
};


// Whenever the page is finished loading, call this function. 
// See: https://learn.jquery.com/using-jquery-core/document-ready/
$(document).ready(function() {
    var terminal = new Terminal();
    terminal.setHeight("400px");
    terminal.blinkingCursor(true);
    
    // Find the "terminal" object and change it to add the HTML that
    // represents the terminal to the end of it.
    $("#terminal").append(terminal.html);

    var stack = [];
//https://www.w3schools.com/js/js_htmldom_events.asp onclick events
    document.getElementById("reset").onclick=function(){
        console.log("hello it is me");
        stack=emptyStack(stack);
        renderStack(stack);
        $("#thestack").append("<tr><td>" + "empty" + "</td></tr>");
        runRepl(terminal, stack);
    };

    print(terminal, "Welcome to HaverForth! v0.1");
    print(terminal, "As you type, the stack (on the right) will be kept in sync");

    runRepl(terminal, stack);
});
