# import the Python libraries we need
from bs4 import BeautifulSoup
import csv

# use Python's open() to open the HTML page we've stored locally
page = open('pages/scraper-0-page-example-table.html', 'r')
# use BeautifulSoup to parse that page into Python
soup = BeautifulSoup(page, 'html.parser')
# and close the HTML page
page.close()

# make ourselves an empty list to hold data for a CSV
list_of_rows = []
# use BeautifulSoup to find the table in our parsed HTML
table = soup.find('table')
# loop through the rows in our table using BeautifulSoup
for row in table.find_all('tr'):
    # create an empty list each time through, to hold cell data
    list_of_cells = []
    # loop through each cell in this table row
    for cell in row.find_all('td'):
        # grab the text from that cell
        text = cell.text.strip()
        # and append it to our list
        list_of_cells.append(text)
    # when we're done with this table row, append its data to our list of rows
    list_of_rows.append(list_of_cells)

# use Python's CSV library to create our output file
outfile = open('nicar_cities.csv', 'w')
writer = csv.writer(outfile)
writer.writerows(list_of_rows)
outfile.close()