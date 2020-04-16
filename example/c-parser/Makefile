all : install run

install :
	npm install node-c-parser

run :
	node test.js t.c >t.c.stdout 2>t.c.stderr
	node test.js struct.h >struct.h.stdout 2>struct.h.stderr

