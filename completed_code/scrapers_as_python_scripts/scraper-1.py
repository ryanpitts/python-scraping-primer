# import the Python libraries we need
import requests
from bs4 import BeautifulSoup
import csv

# if we're working from a local copy of our page ...
# use Python's open() to open the HTML page
#html = open('pages/scraper-1-page.html', 'r')

# if we're requesting a live page over the internet ...
# define the URL we want to scrape
URL = 'https://cp.spokanecounty.org/courtdocumentviewer/PublicViewer/SCHearingsByDate.aspx?d=01/23/2019'
# define the headers our scraper will pass, so we look like a browser
# https://developers.whatismybrowser.com/useragents/explore/
HEADERS = {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0',}
# use requests to fetch that URL
page = requests.get(URL, headers=HEADERS)
# and get the page content into Python
html = page.content

# use BeautifulSoup to parse our page
soup = BeautifulSoup(html, 'html.parser')
# make ourselves an empty list to hold data for a CSV
list_of_rows = []
# use BeautifulSoup to find the table in our parsed HTML
table = soup.find(id='tblHearingsSCByDate')

# loop through the rows in our table using BeautifulSoup
for row in table.find_all('tr', class_='detailrow'):
    # create an empty list each time through, to hold cell data
    list_of_cells = []
    # loop through each cell in this table row
    for cell in row.find_all('td'):
        # we noticed some cruft on one cell, so get rid of it
        if cell.span:
            cell.span.clear()
        # grab the text from that cell
        text = cell.text.strip()
        # and append it to our list
        list_of_cells.append(text)
    # when we're done with this table row, append its data to our list of rows
    list_of_rows.append(list_of_cells)

# use Python's CSV library to create our output file
outfile = open('docket.csv', 'w', newline='', encoding='utf-8')
writer = csv.writer(outfile)
writer.writerows(list_of_rows)
outfile.close()