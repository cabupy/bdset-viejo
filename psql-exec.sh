#/bin/bash
#psql -d meditechdb_dev -U postgres -c "TRUNCATE public.contribuyente" -p 5434 1> logs/sql10.log 2> logs/error10.log
# Ejecutamos los archivos .sql de rucs con terminacion de 0 al 9
#psql -d meditechdb_dev -U postgres -f files/sql/ruc0.sql -p 5434 1> logs/sql0.log 2> logs/error0.log &
#psql -d meditechdb_dev -U postgres -f files/sql/ruc1.sql -p 5434 1> logs/sql1.log 2> logs/error1.log &
#psql -d meditechdb_dev -U postgres -f files/sql/ruc2.sql -p 5434 1> logs/sql2.log 2> logs/error2.log &
#psql -d meditechdb_dev -U postgres -f files/sql/ruc3.sql -p 5434 1> logs/sql3.log 2> logs/error3.log &
psql -d meditechdb_dev -U postgres -f files/sql/ruc4.sql -p 5434 1> logs/sql4.log 2> logs/error4.log &
psql -d meditechdb_dev -U postgres -f files/sql/ruc5.sql -p 5434 1> logs/sql5.log 2> logs/error5.log &
psql -d meditechdb_dev -U postgres -f files/sql/ruc6.sql -p 5434 1> logs/sql6.log 2> logs/error6.log &
psql -d meditechdb_dev -U postgres -f files/sql/ruc7.sql -p 5434 1> logs/sql7.log 2> logs/error7.log &
psql -d meditechdb_dev -U postgres -f files/sql/ruc8.sql -p 5434 1> logs/sql8.log 2> logs/error8.log &
psql -d meditechdb_dev -U postgres -f files/sql/ruc9.sql -p 5434 1> logs/sql9.log 2> logs/error9.log &