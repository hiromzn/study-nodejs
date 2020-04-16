/*
  \    escape
  ^    top
  $    end
  *    repeat 0+alpha (= {0,})
  +    repeat 1+alpha (= {1,})
  ?    repeat 0 or 1
         123abc /\d+/  ==> match 123
		 123abc /\d+?/ ==> match 1
  .    any one char
  (x)  match x and record it.
         reference in match pattern : \1, \2, ...
		 reference in replscement   : $1, $2, ..., $&
		   $& ... all match string
  (?:x)   match x and NOT record it.
  x(?=y)  match x when next of x is y.
  x(?!y)  match x when next of x is NOT y.
  (?<=y)x match x when before of x is y.
  (?<!y)x match x when before of x is NOT y.
  x|y  x or y
  {n}     repeat n.
  {n,}    repeat >=n.
  {n,m}   repeat n<=...<=m
  [xyz]   x or y or z (=[x-z])
  [^xyz]  not( x and y and z )
  \b      match word separator (size is ZERO) (ex: "mam" /\bm/ => first "m")
  [\b]    match backspace (U+0008)
  \B      match NOT word separator. (ex: "aay yes" /y\B./ => "ye");
  \d
  \s
  \w      word (=[A-Za-z0-9_])
  \0      null (U+0000)
  \xhh    2 HEX code
  \uhhhh  4 HEX code
  \u{hhhh} unicode of 4 HEX.
*/
