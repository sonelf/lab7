Question 7, about the JavaScript Debugger:

I think the JS debugger is very user-friendly. One big plus that made programming a lot easier was how the browser window kept track of every variable. When I stepped into the function or over something, it would update right there. It was also helpful that the changes would also be reflected on the webpage, if applicable. 

Question 8: 

1. 
JavaScript was actually the first language I programmed in when I was in high school and last summer I taught very basic JS to kids as my summer job. It was super interesting to see not only how the languages differ, but also how I've evolved as a programmer now that I'm exploring more advanced topics in Java Script.

Through doing this lab in javaScript, I learned how to fuse user experience with my programming. That wasn't a big feature of CS245 in general, but it was cool to keep track of and manage how I need to change the stack and what the user actually sees.

I also was forced to keep track of types while doing this lab. Even though I have a little bit of experience doing this using Racket, this was more practice.

2. 
One instance where the lack of types was annoying is when I accidentally called a function that took terminal and stack as parameters with the parameters in the wrong order (ie, (stack,terminal) instead of (terminal, stack)). C++ would have gotten that immediately but I was getting this really odd bug.

3.
 Sometimes I would declare variables as int i=0, for example, without thinking about it and would get a weird error in my code. I guess I'm so surprised by how used to it I am and that I have to rethink how to declare variables now. Also, lack of var at times has caused some mind boggling bugs that were so unnessesary and stupid. Var is complicated to figure out but I got my code working in the end.

4. 
I didn't really use objects in JavaScript besides the map but that was because my array was just an empty stack.

I thought maps were very easy to use in JS, but was struck by how you can access elements of a map by both treating it like it looks like an array and treating it like it is an object with the "." accessor.

I had trouble with dynamic typing when I didn't correctly use var. In particular, I had two loops in two different places in my code. I used "i=0"for both of them, without var. All of a sudden, my code wouldn't complete the task because I  would call a function with the second loop from the first loop. Because of this, i would get too big and exit the loop prematurely. It was weird, and hard to discribe. But then I realized that since I didn't use var my variable i was global and that it was being dynamic and annoying. I learned a lot through catching that bug, though. 

