FROM mongo
COPY organizers-data.csv /organizers-data.csv
COPY smart-contracts-data.json /smart-contracts-data.json
CMD mongoimport --host mongodb --db billy --collection events --type=csv --headerline --file /organizers-data.csv;mongoimport --host mongodb --db billy --collection eventsRawData --type json --file /smart-contracts-data.json --jsonArray

