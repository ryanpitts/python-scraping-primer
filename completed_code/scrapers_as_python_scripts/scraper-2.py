# import the Python libraries we need
import requests
from bs4 import BeautifulSoup
import csv

# define the URL we want to scrape
URL = 'https://www.fda.gov/ICECI/EnforcementActions/WarningLetters/2018/default.htm'
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
table = soup.find('table')

# make ourselves an empty list to hold data for a CSV
list_of_rows = []
# we'll be scraping multiple pages, so start tracking what page we're on
page_num = 1
# and set up our loop to run until we tell it to stop
more_pages = True

# start our loop to scrape multiple pages
while more_pages is True:
    # loop through the rows in our current table using BeautifulSoup
    # (we noticed that the first row is empty, so we can skip it)
    for row in table.find_all('tr')[1:]:
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
    # look to see if there's a "next page" link on our current page
    if len(soup.find_all('a', href=True, text='Next')) > 0:
        # we have another page! fetch a new table and send it back through the loop
        # adjust the URL we're scraping (in this case, by incrementing the page number)
        page_num += 1
        NEXT_URL = URL + "?Page=" + str(page_num)
        # use requests to fetch our new URL
        page = requests.get(NEXT_URL, headers=HEADERS)
        # as above, get the page content into Python
        # then use BeautifulSoup to parse it and find our table
        html = page.content
        soup = BeautifulSoup(html, 'html.parser')
        table = soup.find('table')
    # if there's no "next page" link, there are no more pages, so drop out of our loop
    else:
        more_pages = False

# use Python's CSV library to create our output file
outfile = open('fda_warning_letters.csv', 'w', newline='', encoding='utf-8')
writer = csv.writer(outfile)
writer.writerows(list_of_rows)
outfile.close()