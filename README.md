# 🕸 Web-Scraper
I have built a webscraper using node.js, XLMS, playwright. Scrapes data from particular website and gives output in the form of excel sheets (tabular format) 
currently its scrapes the data first visible on the page but with some code modification we can scape any amount of data. This work and website's are given by a client from peoplePerHour.com

## 1️⃣ WEBSITE ONE: https://cercalatuascuola.istruzione.it/cercalatuascuola/
Main link -- https://cercalatuascuola.istruzione.it/cercalatuascuola/ -- click on the third Icon above “Ricerca Rapida” – a panel containing “Ricerca avanzata” should now appear – then submit by clicking “Cerca” –
From the list of schools you obtain scrape for every Region –
1. 🏫 Name of the school
2. 📞 Telephone
3. 📧 E-mail
4. 🔢 Every record contains a 5 digits number that should be included in a column named “CAP”
5. 🏙 After the 5 digits number (CAP) there is a written part, this should be included in a column named “City”.
6. 👩‍💻 For each and every school please also include what is contained in the “Codice” dield under a column by the name “School code”

🏁 OUTPUT you can see from the folder and open the excel file

## ✌ WEBSITE TWO:  https://www.education.gouv.fr/annuaire?keywords=&department=&academy=&status=All&establishment=All&geo_point=
Main link - https://www.education.gouv.fr/annuaire?keywords=&department=&academy=&status=All&establishment=All&geo_point=
Simply select “tout” in every field and click on “Chercher” -> for every voice scrape:
1. 🏫 Name of the school
2. 📞 Telephone
3. 📧 Mail address
4. 🔢 Under the voice “Coordonnées” you can find the address, the five digit code contained in this field should be included in a column named “CAP”,
5. 🌆 What follows the 5 digits number should be included in a column named “City”

🏁 OUTPUT you can see from the folder and open the excel file

## 3️⃣ WEBSITE THREE:  https://www.oktatas.hu/hivatali_ugyek/kir_intezmenykereso
go to page: https://www.oktatas.hu/hivatali_ugyek/kir_intezmenykereso
leave all the fields blank - click ”Kereses” – you should obtain 11192 records: For each of these please scrape:
1. 🏫 Name of the school
2. 📞 Telephone
3. 📧 Mail address
4. 🔢 The four digits number in the “Székhely cím:” field should be included in a column named “CAP”,
5. 🌆 What follows the 4 digits number but comes before the comma in the “Székhely cím” field should be included in a column named “City”
6. 🏫🔢 What is contained in the “OM azonosító szám:” field should be included in a column named “School code”

🏁 OUTPUT you can see from the folder and open the excel file
