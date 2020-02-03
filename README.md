# atm
instructions to run the project \
please create and replace mongodb database link "mongodb://localhost:27017/atm" at /models/db \
run \
git clone https://github.com/djmishra11/atm \
cd atm \
npm install \
npm start 

apis 

signup admin \
@post  /api/admin 

signup user\
@post /api/user

login admin\
@post /auth/admin

login user\
@post /auth/user

deposit cash\
@post /api/deposit

withdraw cash\
@post /api/withdraw

check total notes\
@get /api/check





